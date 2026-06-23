import requests
import json
import base64
import sys
import os


def extract_base64_and_save(data_obj, filename="cat_otter.png"):
    """
    无视层级，递归暴搜 JSON 里所有的键值对。
    只要找到 'result' 并且值是超长的 Base64，直接干下来！
    """
    if isinstance(data_obj, dict):
        for key, value in data_obj.items():
            # 判断是不是我们要的 Base64 图片数据
            if key == "result" and isinstance(value, str) and (value.startswith("iVBOR") or len(value) > 1000):
                try:
                    with open(filename, "wb") as f:
                        f.write(base64.b64decode(value))
                    return True  # 抓捕成功！
                except Exception as e:
                    print(f"\n❌ 解码图片时发生错误: {e}")
            else:
                # 没找到就继续往深了找
                if extract_base64_and_save(value, filename):
                    return True

    elif isinstance(data_obj, list):
        for item in data_obj:
            if extract_base64_and_save(item, filename):
                return True

    return False


def image_to_base64_data_url(image_path):
    """
    读取本地图片文件，转换为 data URL 格式的 Base64 字符串。
    支持 png, jpg, jpeg, webp 格式。
    """
    ext = os.path.splitext(image_path)[1].lower()
    mime_map = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".gif": "image/gif",
    }
    mime_type = mime_map.get(ext, "image/png")

    with open(image_path, "rb") as f:
        image_data = f.read()

    b64_str = base64.b64encode(image_data).decode("utf-8")
    return f"data:{mime_type};base64,{b64_str}"


def build_payload_text2img(prompt):
    """模式1：文生图 - 纯文本提示词生成图片"""
    return {
        "model": "gpt-5.3-codex",
        "input": [{"role": "user", "content": prompt}],
        "tools": [{"type": "image_generation", "output_format": "png"}],
        "stream": True
    }


def build_payload_img2img(prompt, image_path):
    """模式2：图生图 - 基于已有图片 + 文字描述进行修改"""
    data_url = image_to_base64_data_url(image_path)

    # 包装提示词，明确告诉模型要编辑图片而不是用文字描述
    edit_prompt = f"请根据以下要求，对我提供的这张图片进行编辑修改，直接生成修改后的新图片。要求：{prompt}"

    return {
        "model": "gpt-5.3-codex",
        "input": [{
            "role": "user",
            "content": [
                {
                    "type": "input_image",
                    "image_url": data_url
                },
                {
                    "type": "input_text",
                    "text": edit_prompt
                }
            ]
        }],
        "tools": [{"type": "image_generation", "output_format": "png"}],
        "stream": True
    }


def send_request(payload, output_filename="cat_otter.png"):
    """发送请求并处理流式响应，保存生成的图片"""
    url = "https://a-ocnfniawgw.cn-shanghai.fcapp.run/v1/responses"

    headers = {
        "Authorization": "Bearer sk-xxxxxxxxxxxx",  # 记得填你的真 Key
        "chatgpt-account-id": "",
        "user-agent": "codex-tui/0.122.0 (Manjaro 26.1.0-pre; x86_64) vscode/3.0.12 (codex-tui; 0.122.0)",
        "version": "0.122.0",
        "originator": "codex_cli_rs",
        "session_id": "test-session",
        "accept": "text/event-stream",
        "Content-Type": "application/json"
    }

    print("[*] 正在向服务器发送请求，请耐心等待 (可能需要几秒到十几秒)...\n")

    # 用来收集模型返回的文本内容（调试用）
    collected_text = []
    found_image = False

    try:
        response = requests.post(url, headers=headers,
                                 json=payload, stream=True)

        if response.status_code != 200:
            print(f"❌ 请求失败！HTTP 状态码: {response.status_code}")
            try:
                print(f"   错误详情: {response.text[:500]}")
            except:
                pass
            sys.exit(1)

        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')

                # 打印服务器事件状态（过滤掉重复的 text.delta 避免刷屏）
                if decoded_line.startswith("event: "):
                    event_name = decoded_line[7:]
                    # 只打印非 delta 的事件，避免刷屏
                    if event_name != "response.output_text.delta":
                        print(f"🔄 接收到服务器事件: {event_name}")

                # 处理包含数据的行
                elif decoded_line.startswith("data: "):
                    data_str = decoded_line[6:]

                    # 过滤掉一些流结束的标记
                    if data_str.strip() == "[DONE]" or data_str.strip() == "":
                        continue

                    try:
                        data = json.loads(data_str)

                        # 核心逻辑：直接把这一坨 JSON 扔进暴搜函数
                        if extract_base64_and_save(data, output_filename):
                            print(
                                f"\n\n✅ 卧槽牛逼！图片已成功抓取并保存为: {output_filename} ！！！")
                            found_image = True
                            return  # 拿到图片，直接收工

                        # 收集文本 delta 内容（调试：看看模型到底在说什么）
                        if isinstance(data, dict):
                            # 尝试提取 text delta
                            delta = data.get("delta", "")
                            if isinstance(delta, str) and delta:
                                collected_text.append(delta)
                                print(delta, end="", flush=True)  # 实时打印文本

                    except json.JSONDecodeError:
                        pass  # 忽略解析失败的行

        if not found_image:
            print("\n")
            if collected_text:
                full_text = "".join(collected_text)
                print("\n⚠️ 流式返回结束，没找到图片。模型返回了以下文本内容:")
                print("─" * 50)
                print(full_text[:2000])
                print("─" * 50)
                print("\n💡 提示: 模型选择了用文字回答而不是生成图片。")
                print("   可以尝试更明确的修改描述，例如: '请编辑这张图片，将所有中文文字替换为对应的英文翻译'")
            else:
                print("\n⚠️ 流式返回结束，还是没找到图片。看看上面打印的事件，是不是哪里报错了？")

    except Exception as e:
        print(f"\n❌ 发生异常: {e}")


def main():
    print("=" * 60)
    print("  🎨 GPT Image 生成工具")
    print("=" * 60)
    print()
    print("  请选择模式:")
    print("  [1] 文生图 - 输入文字描述，生成全新图片")
    print("  [2] 图生图 - 提供一张图片 + 修改描述，基于原图修改")
    print()

    mode = input("👉 请输入模式编号 (1 或 2): ").strip()

    if mode == "1":
        # ===== 模式1：文生图 =====
        print("\n--- 模式1：文生图 ---")
        print("请输入你的提示词 (输入完毕后按回车):")
        prompt = input("📝 提示词: ").strip()

        if not prompt:
            print("❌ 提示词不能为空！")
            sys.exit(1)

        output_filename = input("💾 输出文件名 (直接回车默认 output.png): ").strip()
        if not output_filename:
            output_filename = "output.png"
        if not output_filename.endswith(".png"):
            output_filename += ".png"

        payload = build_payload_text2img(prompt)
        send_request(payload, output_filename)

    elif mode == "2":
        # ===== 模式2：图生图 =====
        print("\n--- 模式2：图生图 ---")
        image_path = input("🖼️  请输入原始图片的路径: ").strip()

        # 去掉可能的引号
        image_path = image_path.strip('"').strip("'")

        if not os.path.isfile(image_path):
            print(f"❌ 找不到图片文件: {image_path}")
            sys.exit(1)

        # 检查文件大小 (限制 50MB)
        file_size_mb = os.path.getsize(image_path) / (1024 * 1024)
        if file_size_mb > 50:
            print(f"❌ 图片文件太大 ({file_size_mb:.1f}MB)，最大支持 50MB")
            sys.exit(1)

        print(f"   ✅ 已加载图片: {image_path} ({file_size_mb:.2f}MB)")

        print("\n请输入你想对图片做的修改描述:")
        prompt = input("📝 修改描述: ").strip()

        if not prompt:
            print("❌ 修改描述不能为空！")
            sys.exit(1)

        output_filename = input("💾 输出文件名 (直接回车默认 edited_output.png): ").strip()
        if not output_filename:
            output_filename = "edited_output.png"
        if not output_filename.endswith(".png"):
            output_filename += ".png"

        payload = build_payload_img2img(prompt, image_path)
        send_request(payload, output_filename)

    else:
        print("❌ 无效的模式选择，请输入 1 或 2")
        sys.exit(1)


if __name__ == "__main__":
    main()

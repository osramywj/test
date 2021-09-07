export const mix1 = {
    methods: {
        getName(){
            console.log(this.name);
        }
    },
    mounted() {
        console.log('mounted', this);
    },
}
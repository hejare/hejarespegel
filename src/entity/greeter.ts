class Greeter implements GreeterInterface {

    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public greet() {
        return `Hello, ${this.name}!`;
    }

}

export default Greeter;
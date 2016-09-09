import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

class Main extends ShallowComponent {

    render(): Object {
        return (
            this.props.children
        );
    }
}
module.exports = Main;

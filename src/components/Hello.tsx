import * as React from "react";

export interface HelloProps { compiler: string; framework: string };

//<HelloProps:props,undefined:state>
export class Helloworld extends React.Component<HelloProps,undefined>{
    render(){
        return <h1>Hello from {this.props.compiler} and {this.props.framework} </h1>
    }
}
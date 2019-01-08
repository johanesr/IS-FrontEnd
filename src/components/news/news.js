import React from "react";

const pStyle = {
    color: "#FFFFFF",
    fontSize: 20
}

class News extends React.Component {
    render() {
        return (
            <div>
                <p style={pStyle}><marquee bgcolor="#02ADEE">
                    Input Image to start!</marquee></p>
            </div>
        )
    }
}

export default News;

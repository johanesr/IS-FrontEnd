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
                    This area is for the news!!!</marquee></p>
            </div>
        )
    }
}

export default News;

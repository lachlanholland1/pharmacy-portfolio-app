import React from "react";

export default function urlProducer(props) {
    var text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var type = props.substr(props.length -4);

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    let final = text.concat("", type);
    console.log(final);
  return final;
}


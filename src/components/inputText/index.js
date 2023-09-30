function inputText(props) {
    return(
        <div>
            <label htmlFor={props.id}>{props.text}</label>
            <input 
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                onChange={props.callback}></input>
        </div>
    );
}

export default inputText;
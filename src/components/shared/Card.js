    export function Card(props) {
      function classes() {
        const bg = props.bgcolor ? `bg-${props.bgcolor}` : 'bg-primary';
        const txt = props.txtcolor ? `text-${props.txtcolor}` : 'text-white';
        return `card mb-3 ${bg} ${txt}`;
      }
    
      return (
        <div className={classes()} style={{ maxWidth: "50%", margin: "auto", marginTop: "25px" }}>
          <div className="card-header">{props.header}</div>
          <div className="card-body">
            {props.image && (
              <div className="card-image">
                <img src={props.image} alt="Image" className="img-fluid" />
              </div>
            )}
            {props.title && (<h5 className="card-title">{props.title}</h5>)}
            {props.text && (<p className="card-text" style={{ color: "pink" }}>{props.text}</p>)}
            {props.body}
            {props.status && (<div id='createStatus'>{props.status}</div>)}
          </div>
        </div>
      );
    }
    
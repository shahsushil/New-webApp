import React from 'react'

export default function NewsItems(props) {
 
    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
        <div className="card" >
          <img src={props.pic} height="200px" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title" style={{height:"110px"}}>{props.title.slice(0,100)+"..."}</h5>
              <hr />
              <p className="card-text" style={{height:"150px"}}>{props.description && props.description.slice(0,200)}</p>
              <a target='_blank' href={props.url} className="btn btn-secondary mt-1 w-100 btn-sm">Read Full Article</a>
            </div>
        </div>
      </div>
    )
  }


import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)
  let [page, setPage] = useState(1)
  async function getApiData() {
    setPage(1)
    if (props.search !== "")
      var response = await fetch(`https://newsapi.org/v2/everything?q=${props.search}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
    else
       response = await fetch(`https://newsapi.org/v2/everything?q=${props.q}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
    var result = await response.json()
    setArticles(result.articles)
    setTotalResults(result.totalResults)
  }
  const fetchMoreData = async () => {
    setPage(page + 1)
    if (props.search !== "")
      var response = await fetch(`https://newsapi.org/v2/everything?q=${props.search}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
    else
       response = await fetch(`https://newsapi.org/v2/everything?q=${props.q}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
    var result = await response.json()
    
      setArticles(articles.concat(result.articles))
  
  }
  useEffect(()=>{
    getApiData()

  },[props.q,props.language,props.search])
  return (
    <div className='container-fluid'>
      <h5 className='text-center p-1 bg-success mt-2 text-light  ' >{(props.search && props.search) || props.q} News Section</h5>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<h4 className='text-center'>...Loading...</h4>}
      >
        <div className="row">
          {
            articles.map((item, index) => {
              return <NewsItems
                key={index}
                title={item.title}
                source={item.source}
                description={item.description}
                pic={item.urlToImage}
                date={item.publishedAt}
                url={item.url}
              />
            })
          }
        </div>
      </InfiniteScroll>
    </div>
  )
}


// import React, { useState, useEffect } from 'react'
// import NewsItems from './NewsItems'
// import InfiniteScroll from "react-infinite-scroll-component";

// export default function Home(props) {
//   let [articles, setArticles] = useState([])
//   let [totalResults, setTotalResults] = useState(0)
//   let [page, setPage] = useState(1)
//   async function getApiData() {
//     setPage(1)
//     if (props.search !== "")
//       var response = await fetch(`https://newsapi.org/v2/everything?q=${props.search}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
//     else
//        response = await fetch(`https://newsapi.org/v2/everything?q=${props.q}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
//     var result = await response.json()
//     setArticles(result.articles)
//     setTotalResults(result.totalResults)
//   }
//   const fetchMoreData = async () => {
//     setPage(page + 1)
//     if (props.search !== "")
//       var response = await fetch(`https://newsapi.org/v2/everything?q=${props.search}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
//     else
//        response = await fetch(`https://newsapi.org/v2/everything?q=${props.q}&page=${page}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`)
//     var result = await response.json()
    
//       setArticles(articles.concat(result.articles))
  
//   }
//   useEffect(()=>{
//     getApiData()

//   },[props.q,props.language,props.search])
//   return (
//     <div className='container-fluid'>
//       <h5 className='text-center p-1 bg-success mt-2 text-light  ' >{(props.search && props.search) || props.q} News Section</h5>
//       <InfiniteScroll
//         dataLength={articles.length}
//         next={fetchMoreData}
//         hasMore={articles.length < totalResults}
//         loader={<h4 className='text-center'>...Loading...</h4>}
//       >
//         <div className="row">
//           {
//             articles.map((item, index) => {
//               return <NewsItems
//                 key={index}
//                 title={item.title}
//                 source={item.source}
//                 description={item.description}
//                 pic={item.urlToImage}
//                 date={item.publishedAt}
//                 url={item.url}
//               />
//             })
//           }
//         </div>
//       </InfiniteScroll>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
  let [articles, setArticles] = useState([])
  let [totalResults, setTotalResults] = useState(0)
  let [page, setPage] = useState(1)

  // Function to fetch data, now moved inside useEffect as a cleaner practice,
  // OR defined using useCallback (but we will keep it simple here).

  // We are defining the function outside, so we must wrap it in useCallback
  // or use the array as Netlify suggested.

  // --- FIX APPLIED HERE: Define getApiData INSIDE useEffect ---
  useEffect(() => {
    // Define the async function inside useEffect to satisfy the dependency requirement
    async function getApiData() {
      setPage(1)
      
      // Determine the correct API URL based on props
      let apiUrl;
      if (props.search !== "") {
        apiUrl = `https://newsapi.org/v2/everything?q=${props.search}&page=1&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`
      } else {
        apiUrl = `https://newsapi.org/v2/everything?q=${props.q}&page=1&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`
      }

      var response = await fetch(apiUrl)
      var result = await response.json()
      setArticles(result.articles)
      setTotalResults(result.totalResults)
    }

    getApiData()

  // --- Dependency array now correctly includes all external props used ---
  }, [props.q, props.language, props.search])


  const fetchMoreData = async () => {
    // IMPORTANT: Use the functional update form of setPage
    // to ensure you're using the latest state value (prevPage + 1)
    setPage(prevPage => prevPage + 1) 

    // The fetch URL needs to use the updated 'page' state.
    // However, fetchMoreData is called *before* the state update is complete.
    // To ensure the correct page is fetched, use the value we just set: page + 1
    const nextPage = page + 1;

    let apiUrl;
    if (props.search !== "") {
      apiUrl = `https://newsapi.org/v2/everything?q=${props.search}&page=${nextPage}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`
    } else {
      apiUrl = `https://newsapi.org/v2/everything?q=${props.q}&page=${nextPage}&pageSize=20&language=${props.language}&apiKey=e95ebb8bb3e446c696822e5aca1b9ab0`
    }

    var response = await fetch(apiUrl)
    var result = await response.json()
    
    // Concatenate new articles
    setArticles(articles.concat(result.articles))
  }

  return (
    <div className='container-fluid'>
      <h5 className='text-center p-1 bg-success mt-2 text-light  ' >{(props.search && props.search) || props.q} News Section</h5>
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
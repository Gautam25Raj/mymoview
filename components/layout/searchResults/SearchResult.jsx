'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Result from './Result';
import CarouselItem from '@/components/carousel/CarouselItem';
import InfiniteScroll from 'react-infinite-scroll-component';

async function getSearchDetails(query, pageNum) {
  const res = await fetch(`${process.env.URL}/api/search/${query}/${pageNum}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const SearchResult = () => {
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const getData = async () => {
    await getSearchDetails(query, pageNum).then((res) => {
      if (searchResult?.results) {
        setSearchResult({
          ...searchResult,
          results: [...searchResult?.results, ...res.results],
        });
      } else {
        setSearchResult(res);
      }

      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const Spinner = () => (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <div className="searchResultPage">
      {loading ? (
        <Spinner />
      ) : (
        <div className="px-5">
          {searchResult?.results?.length < 1 ? (
            <div>No results found 😢</div>
          ) : (
            <>
              <h2 className="text-2xl my-5">
                {`Search 
                ${searchResult?.results?.length > 1 ? 'results' : 'result'}
              for "${query}"`}
              </h2>

              <section className="flex w-full justify-center flex-wrap gap-5">
                {searchResult?.results?.map(
                  (result) =>
                    result.media_type !== 'person' && (
                      <div key={result.id}>
                        <InfiniteScroll
                          dataLength={searchResult?.results?.length || []}
                          next={getData}
                          hasMore={pageNum < searchResult?.total_pages}
                        >
                          <CarouselItem
                            item={result}
                            type={result?.type}
                            key={result.id}
                          />
                        </InfiniteScroll>
                      </div>
                    )
                )}
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;

import { useSelector } from 'react-redux';

const Genres = ({ ids }) => {
  const { genres } = useSelector((state) => state.home);
  console.log(genres);
  console.log(ids);
  return (
    <div className="flex max-w-[210px] overflow-hidden mb-2">
      {ids.map((id) => {
        return (
          <h4
            key={id}
            className="text-sm text-gray-600 mr-2 bg-white px-1 py-0.5 rounded-sm whitespace-nowrap"
          >
            {genres[id]?.name}
          </h4>
        );
      })}
    </div>
  );
};

export default Genres;

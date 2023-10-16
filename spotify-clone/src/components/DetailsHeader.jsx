import { NavLink } from 'react-router-dom';

const DetailsHeader = ({ artistData, songData }) => {
  console.log(artistData);
  console.log(artistData?.attributes?.name);
  return (
    <div className='relative w-full flex flex-col'>
      <div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28' />
      {/* Profile image */}
      <div className='absolute inset-0 flex items-center'>
        <img
          alt='profile'
          src={
            songData
              ? songData?.images?.coverart
              : artistData?.attributes?.artwork?.url
                  .replace('{w}', 500)
                  .replace('{h}', 500)
          }
          className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
        />
        {/* Song title/Artist name & genre */}
        <div className='ml-5'>
          <p className='font-bold sm:text-3xl text-xl text-white'>
            {songData ? songData?.title : artistData?.attributes?.name}
          </p>
          {songData && (
            <NavLink to={`/artists/${songData?.artists[0]?.adamid}`}>
              <p className='text-base text-gray-400 mt-2'>
                {songData?.subtitle}
              </p>
            </NavLink>
          )}
          <p className='text-base text-gray-400 mt-2'>
            {songData
              ? songData?.genres?.primary
              : artistData?.attributes?.genreNames[0]}
          </p>
        </div>
      </div>
      <div className='w-full sm:h-44 h-24' />
    </div>
  );
};

export default DetailsHeader;

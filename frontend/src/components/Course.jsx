import React from 'react'
import list from '../../public/list.json'
import Cards from './Cards';
import { Link } from 'react-router-dom';
function Course() {
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
                <div className='mt-28 items-center justify-center text-center'>
                    <h1 className='text-2xl  md:text-4xl' >We're delighted to have u <span className='text-pink-500'>here :(</span> </h1>
                    <p className='mt-12'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, dolore quae dicta illo, unde nostrum ab voluptatem libero minima odit vel corrupti quibusdam voluptatibus saepe eaque repellendus veniam laudantium dolor! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus eum atque eaque corporis tempore, sed unde nemo odio assumenda optio inventore aspernatur laudantium at ab adipisci quisquam ex quas labore.
                    </p>
                    <Link to='/'>
                        <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duartion-300'>
                            Back
                        </button>
                    </Link>
                </div>
                <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
                    {list.map((item) => {
                        return <Cards key={item.id} item={item} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Course
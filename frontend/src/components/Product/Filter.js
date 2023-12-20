import React from 'react'
import { Slider } from '@mui/material';


function Filter({ price, setPrice, categories, category, setCategory }) {
    const handleChange = (event, newPrice) => {
        setPrice(newPrice)
    }

    function handleCheckedClick(categoryName){
        setCategory(categoryName)
        const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

        checkBoxes.forEach(checkBox => {
            if(checkBox.name !== categoryName){
                checkBox.checked = false;
            }
        })
    }

    return (
        <>
            <h4 className='font-bold text-xl mb-1'>Price Range</h4>
            <Slider

                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
            />
            <div className="categories">
                <h4 className='font-bold text-xl mb-3'>Categories</h4>
                {categories && categories.map(category => {
                    return <div key={category}>
                        <input type="checkbox" id={category} name={category} onClick={()=> handleCheckedClick(category)}/>
                        <label htmlFor={category} className='list-none cursor-pointer m-2' onClick={()=> handleCheckedClick(category)}>{category} </label>
                    </div>
                })}
            </div>
        </>
    )
}

export default Filter
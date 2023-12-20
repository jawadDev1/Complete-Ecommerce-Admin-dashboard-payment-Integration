import React from 'react'
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <>
            <div className="container p-5 mt-5 flex flex-col md:gap-8 gap-4 md:min-h-[100vh]">

                <Link to={'/admin/dashboard'} className='flex items-center gap-2 hover:bg-gray-200'>
                    <DashboardIcon />
                    <p className='text-lg font-medium'>DashBoard</p>
                </Link>
                <div className='bg-whit  hover:bg-gray-200'>
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >

                        <TreeItem nodeId="2" label="Products">
                            <Link to={'/admin/products/allproducts'}>
                                <TreeItem nodeId="3" label="All" />
                            </Link>
                            <Link to={'/admin/products/addproduct'} >
                                <TreeItem nodeId="4" label="Add Product" />
                            </Link>
                        </TreeItem>
                    </TreeView>
                </div>

                <Link to={'/admin/orders/allorders'} className='flex items-center gap-2  hover:bg-gray-200'>
                    <ListAltIcon />
                    <p className='text-lg font-medium'>Orders</p>
                </Link>
                <Link to={'/admin/users/allusers'} className='flex items-center gap-2  hover:bg-gray-200'>
                    <GroupIcon />
                    <p className='text-lg font-medium'>Users</p>
                </Link>
                <Link to={'/admin/reviews'} className='flex items-center gap-2  hover:bg-gray-200'>
                    <ReviewsIcon />
                    <p className='text-lg font-medium'>Reviews</p>
                </Link>




            </div>
        </>
    )
}

export default SideBar
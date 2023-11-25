import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import  axios  from 'axios';
import apis from '../../services/apis.json'
import ApiClient from '../../services/ApiClient'


export default function UserTable() {
    const [apiData, setApiData] = useState([]);


    const columns = [
        { field: "rowIndex", headerName: "S.No", width: 50 }
       ,
        { field: "firstName", headerName: "name" ,width: 200},
        { field: "lastName", headerName: "last name",width: 200 },
        { field: "email", headerName: "Email",width: 200 },
        { field: "country", headerName: "country",width: 200 },
        { field: "state", headerName: "state",width: 200 },
        { field: "city", headerName: "city",width: 200 },
        { field: "gender", headerName: "gender",width: 200 },
        { field: "dateOfBirth", headerName: "date Of Birth",width: 200 },
        { field: "age", headerName: "age",width: 200 },

        {
            field: "edit",
            headerName: "Data",
            sortable: false,
            renderCell: (params) => (
             
                    <Link to={'/userdara/' + params.row._id}>
                        <AccountCircleIcon style={{ cursor: 'pointer' }} />
                    </Link>
               
            ),
        },
    
    ];



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await ApiClient.get(apis.reguser);
                const dataWithIds = response.data.map((row, index) => ({ id: index, ...row }));
                setApiData(dataWithIds);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>

<button sty><Link to="/" style={{textDecoration:"none"}}>back</Link></button>
<div class="registration-container">
    <h1> User Table</h1>

</div>
               
                <Box sx={{ height: "100vh", width: '100%' }}style={{backgroundColor:"#fff"}}>
                    <DataGrid
                        
                        rows={apiData}
                        columns={columns}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </Box>
                  
        </div>
    );
}

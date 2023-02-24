import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const userlisturi = "https://wm1fd0m7t4.execute-api.ap-southeast-1.amazonaws.com/dev";

type FunProps = {
    passCreate: Function;
    passID: Function;
    calltime: number;
}

const UserList = ( { passCreate, passID, calltime }: FunProps ) => {

    const [ listdata, setListData ] = useState<any>('');

    const columns: GridColDef[] = [
        {field: 'action', headerName: 'Action', sortable: false,
        renderCell: (params) =>{
            const onClick = (e:any) =>{
                e.stopPropagation();

                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue>={};

                api.getAllColumns().filter((c)=>c.field !== '__check__' && !!c).forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)),);

                let rowid = params.id;

                return handleClick(rowid);

            }

            return <Button onClick={onClick}>Click</Button>
        }},
        {field: '_id', headerName: 'ID'},
        {field: 'username', headerName: 'Username'},
        {field: 'group', headerName: 'Group'},
        {field: 'search_count', headerName: 'Search Count'}
    ];

    const handleClick = async (e:any) => {
        passCreate(true);
        // console.log(e);
        passID(e);
    }

    const getUser = async () => {
        let result = await axios.post(userlisturi + "/user/create", {
            token: sessionStorage.getItem("token")
        });
        setListData(result.data.body);
    };

    useEffect (()=>{
        getUser();
    },[]);

    useEffect (()=>{
        getUser();
    },[calltime]);

    return (
        <div style={{height: 700, width: '100%'}}>
            <DataGrid
                getRowId={(row)=>row._id}
                rows={listdata}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default UserList;
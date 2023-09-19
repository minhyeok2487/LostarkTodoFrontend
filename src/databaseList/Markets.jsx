import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { call } from "../service/api-service";

const Markets = () => {
    const columns = [
        { id: 'name', name: '이름' },
        { id: 'grade', name: '등급' },
        { id: 'bundleCount', name: '묶음' },
        { id: 'ydayAvgPrice', name: '전일 평균가' },
        { id: 'recentPrice', name: '최근 거래가' },
        { id: 'currentMinPrice', name: '현재 가격' },
    ]

    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(20);

    useEffect(() => {
        call("/api/db/markets", "GET", null).then((response) => {
            rowchange(response);
        });
      }, []);

    return (
        <>
            <div className='bgcolor'>
                <Box sx={{ display: 'flex'}}>
                    <Box component="main" sx={{width: '100%'}}>
                        <div sx={{ textAlign: 'center' }}>
                            <Paper>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell key={column.id}>{column.name}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows && rows
                                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                                .map((row) => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            {columns && columns.map((column, i) => {
                                                                let value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id}>
                                                                        {value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[20, 40, 60]}
                                    rowsPerPage={rowperpage}
                                    page={page}
                                    count={rows.length}
                                    component="div"
                                    onPageChange={handlechangepage}
                                    onRowsPerPageChange={handleRowsPerPage}

                                >
                                </TablePagination>
                            </Paper>
                        </div>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default Markets;
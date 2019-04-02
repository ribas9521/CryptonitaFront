import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Card from '../../../common/ui/card/card';
import { format2Digits, format8Digits } from '../../../common/helpers/formatValues';

export default props => {
    const {isPublic} = props
    return (
        <Card title="Orders">
            <div className="table-responsive" style={{maxHeight: '350px', overflowY: 'auto', overflowX:'hidden'}}>
                <Table className="table table-striped table-hover">
                    <Thead>
                        <Tr className="row-name">
                            <Th>Pair</Th>
                            <Th>Return</Th>
                            <Th>Date</Th>
                            <Th>Side</Th>
                            <Th>Type</Th>
                            {
                                !isPublic? 
                                    <Th>Quantity</Th>:
                                null
                            }
                            <Th>Price</Th>
                            <Th>Status</Th>
                            
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            props.orderList
                            .filter(order=>order.currentOrderStatus !=="NEW")
                            .map((order,i) => (
                                <Tr key={`tr${i}`} className="row-content">
                                    <Td>{order.symbol}</Td>
                                    <Td>{order.profit ? order.profit.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "%" : '-'}</Td>
                                    <Td>{new Date(order.createdAt).toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</Td>
                                    <Td>{order.side}</Td>
                                    <Td>{order.type}</Td>
                                    {
                                        !isPublic ? <Td>{order.orderQuantity}</Td> : null
                                    }
                                    <Td>{ format8Digits(order.lastExecutedPrice)}</Td>
                                    <Td>{ order.currentOrderStatus}</Td>
                                </Tr>
                            ))
                        }

                    </Tbody>
                </Table>
            </div>
        </Card>)

}
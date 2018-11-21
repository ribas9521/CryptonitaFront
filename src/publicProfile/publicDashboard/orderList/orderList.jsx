import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Card from '../../../common/ui/card/card';

export default props => {
    return (
        <Card title="Orders">
            <div className="table-responsive" style={{maxHeight: '350px', overflowY: 'auto', overflowX:'hidden'}}>
                <Table className="table table-striped table-hover">
                    <Thead>
                        <Tr className="row-name">
                            <Th>Pair</Th>
                            <Th>Side</Th>
                            <Th>Type</Th>
                            <Th>Quantity</Th>
                            <Th>Status</Th>
                            <Th>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            props.orderList.map((order,i) => (
                                <Tr key={`tr${i}`} className="row-content">
                                    <Td>{order.symbol}</Td>
                                    <Td>{order.side}</Td>
                                    <Td>{order.type}</Td>
                                    <Td>{order.orderQuantity}</Td>
                                    <Td>{order.lastExecutedPrice}</Td>
                                    <Td>{order.currentOrderStatus}</Td>
                                </Tr>
                            ))
                        }

                    </Tbody>
                </Table>
            </div>
        </Card>)

}
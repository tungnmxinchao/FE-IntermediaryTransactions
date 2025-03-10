import React from 'react';
import './MyPurchaseTable.css';

const MyPurchaseTable = ({ transactions }) => {
  return (
    <div className="table-container">
      <table className="my-purchase-table">
        <thead>
          <tr>
            <th>Mã trung gian</th>
            <th>Chủ đề</th>
            
            <th>Người bán</th>
            <th>Phương thức liên hệ</th>
            <th>Giá tiền</th>
            <th>Bên chịu phí</th>
            <th>Phí trung gian</th>
            <th>Thời gian tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.code}</td>
              <td>{transaction.topic}</td>
              <td>
                <span className="status-badge" data-status={transaction.statusId}>
                  {transaction.status}
                </span>
              </td>
              <td>{transaction.seller}</td>
              <td>{transaction.contact}</td>
              <td>{transaction.price.toLocaleString()}đ</td>
              <td>{transaction.feeBearer}</td>
              <td>{transaction.fee.toLocaleString()}đ</td>
              <td>{new Date(transaction.createdAt).toLocaleString()}</td>
              <td>
                <button className="view-details-button">
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPurchaseTable; 
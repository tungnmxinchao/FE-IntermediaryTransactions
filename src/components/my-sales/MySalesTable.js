import React from 'react';
import './MySalesTable.css';

const MySalesTable = ({ transactions }) => {
  return (
    <div className="table-container">
      <table className="my-sales-table">
        <thead>
          <tr>
            <th>Mã trung gian</th>
            <th>Chủ đề</th>
            <th>Người mua</th>
            <th>Phương thức</th>
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
              <td>{transaction.buyer}</td>
              <td>{transaction.method}</td>
              <td>{transaction.price.toLocaleString('vi-VN')} VNĐ</td>
              <td>{transaction.feeBearer}</td>
              <td>{transaction.fee.toLocaleString('vi-VN')} VNĐ</td>
              <td>{new Date(transaction.createdAt).toLocaleString('vi-VN')}</td>
              <td>
                <button 
                  className="view-details-button"
                  onClick={() => window.location.href = `/transaction/${transaction.id}`}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySalesTable; 
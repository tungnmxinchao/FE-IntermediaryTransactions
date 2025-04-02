import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = React.useState({
    topic: '',
    minPrice: '',
    maxPrice: '',
    feeBearer: '',
    buyer: '',
    seller: '',
    createdAt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trim all text inputs before submitting
    const trimmedParams = Object.keys(searchParams).reduce((acc, key) => {
      acc[key] = typeof searchParams[key] === 'string' 
        ? searchParams[key].trim() 
        : searchParams[key];
      return acc;
    }, {});
    onSearch(trimmedParams);
  };

  const handleReset = () => {
    const resetParams = {
      topic: '',
      minPrice: '',
      maxPrice: '',
      feeBearer: '',
      buyer: '',
      seller: '',
      createdAt: ''
    };
    setSearchParams(resetParams);
    onSearch(resetParams);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-grid">
        <div className="search-field">
          <label htmlFor="topic">Chủ đề</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={searchParams.topic}
            onChange={handleChange}
            placeholder="Nhập chủ đề"
          />
        </div>
        <div className="search-field">
          <label>Khoảng giá</label>
          <div className="price-inputs">
            <input
              type="number"
              name="minPrice"
              value={searchParams.minPrice}
              onChange={handleChange}
              placeholder="Từ"
              min="0"
            />
            <span className="price-separator">-</span>
            <input
              type="number"
              name="maxPrice"
              value={searchParams.maxPrice}
              onChange={handleChange}
              placeholder="Đến"
              min="0"
            />
          </div>
        </div>
        <div className="search-field">
          <label htmlFor="feeBearer">Bên chịu phí</label>
          <select
            id="feeBearer"
            name="feeBearer"
            value={searchParams.feeBearer}
            onChange={handleChange}
          >
            <option value="">Tất cả</option>
            <option value="buyer">Người mua</option>
            <option value="seller">Người bán</option>
          </select>
        </div>
        <div className="search-field">
          <label htmlFor="seller">Người bán</label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={searchParams.seller}
            onChange={handleChange}
            placeholder="Nhập tên người bán"
          />
        </div>
        <div className="search-field">
          <label htmlFor="buyer">Người mua</label>
          <input
            type="text"
            id="buyer"
            name="buyer"
            value={searchParams.buyer}
            onChange={handleChange}
            placeholder="Nhập tên người mua"
          />
        </div>
        <div className="search-field">
          <label htmlFor="createdAt">Thời gian tạo</label>
          <input
            type="date"
            id="createdAt"
            name="createdAt"
            value={searchParams.createdAt}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-buttons">
        <button type="submit" className="search-button">
          Tìm kiếm
        </button>
        <button type="button" className="reset-button" onClick={handleReset}>
          Đặt lại
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 
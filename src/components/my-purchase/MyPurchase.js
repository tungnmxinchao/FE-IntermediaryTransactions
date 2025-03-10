const getStatusText = (statusId) => {
  switch (statusId) {
    case 1:
      return "Sẵn sàng giao dịch";
    case 2:
      return "Bị hủy";
    case 3:
      return "Kiểm tra hàng";
    case 4:
      return "Hoàn thành";
    case 5:
      return "Khiếu nại";
    case 6:
      return "Khiếu nại không sai";
    case 7:
      return "Yêu cầu admin";
    case 8:
      return "Chờ bên mua xác nhận";
    default:
      return "Không xác định";
  }
};

const fetchOrders = useCallback(async (params) => {
  const response = await fetch(buildODataQuery(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!response.ok) {
    return {
      items: [],
      total: 0
    };
  }

  const data = await response.json();
  
  return {
    items: data.value.map(order => ({
      id: order.Id,
      code: order.Id.substring(0, 8),
      topic: order.Title,
      description: order.Description,
      seller: order.CreatedByUser ? order.CreatedByUser.Username : "Chưa có người bán",
      contact: order.Contact,
      price: order.MoneyValue,
      feeBearer: order.IsSellerChargeFee ? "Người bán" : "Người mua",
      fee: order.FeeOnSuccess,
      createdAt: order.CreatedAt,
      totalMoneyForBuyer: order.TotalMoneyForBuyer,
      sellerReceived: order.SellerReceivedOnSuccess,
      isPublic: order.IsPublic,
      status: getStatusText(order.StatusId),
      statusId: order.StatusId
    })),
    total: data['@odata.count'] || 0
  };
}, [buildODataQuery]); 
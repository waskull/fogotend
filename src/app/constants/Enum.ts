export enum statusEnum{
    WAITING = "Esperando entrega",
    INCOMPLETE = "Esperando confirmación de pago",
    COOKING = "En proceso de preparación",
    COMPLETED_TABLE = "Comida servida",
    COMPLETED = "Producto entregado",
    CANCELED = "Pedido cancelado por el usuario",
    CANCELED_SYSTEM = "Pedido cancelado por el sistema"
}

export enum Method{
    Cash = "Efectivo",
    Mobile = "Pago Móvil",
    Transfer = "Transferencia"
}

export enum ECalendarValue {
    Dayjs = 1,
    DayjsArr,
    String,
    StringArr,
  }

export enum Rol {
    ADMIN = 'admin',
    MANAGER = 'gerente',
    CASHIER = 'cajero',
    CLIENT = 'cliente',
    DELIVERY_MAN = 'repartidor'
}

export enum ComplaintType {
    COMPLAINT = "Queja",
    CLAIM = "Reclamo",
    SUGGESTION = "Sugerencia",
    OTHER = "Otro",
}

export enum ComplaintStatus {
    REJECTED = "Reclamo rechazado",
    ACCEPTED = "Reclamo aceptado",
    PENDING = "Reclamo pendiente",
    WAITING = "Reclamo en revisión"
}

export enum ErrorStatus{
    NO_NETWORK = "NetworkError when attempting to fetch resource.",
    NO_FETCH = "Failed to fetch"
}
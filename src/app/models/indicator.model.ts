export class Indicators {
    
    public Id?: string|null=null;
    public Indicator?: string|null=null;
    public Weight?: number|null=null;
    public UserName?: string|null=null;
    public UserPosition?: string|null=null;
    public UserId?: string|null=null;
    public Q1?: string|null=null;
    public Q2?: string|null=null;
    public Q3?: string|null=null;
    public Q4?: string|null=null;
    public Fails?: string|null=null;
    public Min?: string|null=null;
    public Delivers?: string|null=null;
    public Exceeds?: string|null=null;
    public Excellent?: string|null=null;
    public Type?: string|null=null;
    public Calculation?: string|null=null;
    public Source?: string|null=null;
    public Metric?: string|null=null;
    public Unit?: string|null=null;
    public Flow?: string|null=null;
  }

  
export const indicatorsList: Indicators[] = [
  {
    Id:'indicator11',
    Indicator:'PAQUETERIA ESTRATEGICA ZONA NORTE',
    Weight:10,
    UserName:'Lolito Fdez',
    UserPosition:'Alcalde',
    UserId:'tF9fF8EcbmTNMSwIQT9KjMAGiFx1',
    Q1:'',
    Q2:'',
    Q3:'',
    Q4:'',
    Fails:'0',
    Min:'10',
    Delivers:'15',
    Exceeds:'25',
    Excellent:'50',
    Type:'Cuantitativo',
    Calculation:'$ Disminucion de costos de envios zona norte ',
    Source:'FACTURACION ESTAFETA  + REPORTE PDCA',
    Metric:'Costo Inicial vs Costo final',
    Unit:'Percentage',
    Flow:'Forward'
  },
  {
    Id:'indicator12',
    Indicator:'TRANSACCION EN TIEMPO Y FORMA DAX',
    Weight:30,
    UserName:'Lolito Fdez',
    UserPosition:'Alcalde',
    UserId:'tF9fF8EcbmTNMSwIQT9KjMAGiFx1',
    Q1:'',
    Q2:'',
    Q3:'',
    Q4:'',
    Fails:'20',
    Min:'15',
    Delivers:'10',
    Exceeds:'5',
    Excellent:'0',
    Type:'Cuantitativo',
    Calculation:' DE CANTIDAD ERRORES MENSUALES',
    Source:'FACTURACION ESTAFETA  + REPORTE PDCA',
    Metric:'Total de transacciones vs qty de errores',
    Unit:'Percentage',
    Flow:'Forward'
  },
  {
    Id:'indicator13',
    Indicator:'RASTREO Y SEGUMINETO DE ORDENES ESTAFETA',
    Weight:30,
    UserName:'Lolito Fdez',
    UserPosition:'Alcalde',
    UserId:'tF9fF8EcbmTNMSwIQT9KjMAGiFx1',
    Q1:'',
    Q2:'',
    Q3:'',
    Q4:'',
    Fails:'70',
    Min:'75',
    Delivers:'80',
    Exceeds:'85',
    Excellent:'95',
    Type:'Cuantitativo',
    Calculation:' EFICIENCIA DE ENTREGA',
    Source:'TRACKING REPORT  + REPORTE PDCA',
    Metric:'Entregas a tiempo vs late',
    Unit:'Percentage',
    Flow:'Forward'
  },
  {
    Id:'indicator14',
    Indicator:'DISTRIBUCION NACIONAL DE PRODUCTO',
    Weight:20,
    UserName:'Lolito Fdez',
    UserPosition:'Alcalde',
    UserId:'tF9fF8EcbmTNMSwIQT9KjMAGiFx1',
    Q1:'',
    Q2:'',
    Q3:'',
    Q4:'',
    Fails:'5',
    Min:'4',
    Delivers:'3',
    Exceeds:'1',
    Excellent:'0',
    Type:'Cuantitativo',
    Calculation:'CANTIDAD DE STOCK OUTS AL MES',
    Source:'PLANNING REPORT  + REPORTE PDCA',
    Metric:'Cantidad de eventos al mes',
    Unit:'Count',
    Flow:'Reverse'
  },
  {
    Id:'indicator15',
    Indicator:'PROYECTO ENTREGA MISMO DIA',
    Weight:10,
    UserName:'Lolito Fdez',
    UserPosition:'Alcalde',
    UserId:'tF9fF8EcbmTNMSwIQT9KjMAGiFx1',
    Q1:'',
    Q2:'',
    Q3:'',
    Q4:'',
    Fails:'0',
    Min:'3',
    Delivers:'5',
    Exceeds:'10',
    Excellent:'20',
    Type:'Cuantitativo',
    Calculation:' INCREMENTO  D0 ',
    Source:'TRACKING REPORT  + REPORTE PDCA',
    Metric:'qty Ordenes entregadas',
    Unit:'Percentage',
    Flow:'Forward'
  }
];
//tF9fF8EcbmTNMSwIQT9KjMAGiFx1 lolito
//fv605RwnutSrlXbbnIZnWiaXzyv2 jim
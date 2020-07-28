export class Employee {
    Id: number=0;
    public Name: string|null=null;
    public Position: string|null=null;
    public Email: string|null=null;
    public Q1: string|null=null;
    public Q2: string|null=null;
    public Q3: string|null=null;
    public Q4: string|null=null;
    imagePath:string|null=null;
  }

  
export const employeesList: Employee[] = [
    {
        Id: 1,
        Name: 'Sam',
        Position:'Recepción',
        Email: 's@gmail.com',
        imagePath: 'assets/images/users/1.jpg',
        Q1:'60%',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 2,
        Name: 'John',
        Position:'CCR I',
        Email: 'j@gmail.com',
        imagePath: 'assets/images/users/2.jpg',
        Q1:'50%',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 3,
        Name: 'Will Smith',
        Position:'CCR I Bilingüe y',
        Email: 'ws@gmail.com',
        imagePath: 'assets/images/users/3.jpg',
        Q1:'',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 4,
        Name: 'Tom Hardy',
        Position:'CCR I',
        Email: 'tom@gmail.com',
        imagePath: 'assets/images/users/4.jpg',
        Q1:'',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 5,
        Name: 'Martha Curse',
        Position:'CCR I',
        Email: 'martha@gmail.com',
        imagePath: 'assets/images/users/5.jpg',
        Q1:'',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 6,
        Name: 'Kristen',
        Position:'CCR I',
        Email: 'sweet@gmail.com',
        imagePath: 'assets/images/users/6.jpg',
        Q1:'',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 7,
        Name: 'Mam',
        Position:'CCR I',
        Email: 's@gmail.com',
        imagePath: 'assets/images/users/1.jpg',
        Q1:'',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 8,
        Name: 'Johnathan',
        Position:'CCR I',
        Email: 'jnathan@gmail.com',
        imagePath: 'assets/images/users/2.jpg',
        Q1:'',
        Q2:'',
        Q3:'',
        Q4:''
    },
    {
        Id: 9,
        Name: 'Will mark',
        Position:'CCR I',
        Email: 'wsmark@gmail.com',
        imagePath: 'assets/images/users/3.jpg',
        Q1:'',
        Q2:'',
        Q3:'',
        Q4:''
    },
];
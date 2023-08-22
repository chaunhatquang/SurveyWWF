export interface IResAddInfo {
    code: string,
    result: Iresult[]
}

export interface Iresult {
    id: string,
    name: string,
    address: string,
    location: ILocation,
    addressComponents: IAddressComponents[]
}

export interface ILocation {
    lng: number,
    lat: number
}

export interface IAddressComponents {
    types: string[],
    name: string
}

export interface IQuanHuyen {
    id: number,
    maquanhuyen: string,
    tenquanhuyen: string,
    matinhthanh: string,
    tenmatinhthanh: string,
}

export interface IPhuongXa {
    id: number,
    maphuongxa: string,
    tenphuongxa: string,
    matinhthanh: string,
    tenmatinhthanh: string,
    maquanhuyen: string,
    tenmaquanhuyen: string,
}

export interface IThonTo {
    id: number,
    mathonto: string,
    tenthonto: string,
}

export interface IThongTinTaiKhoan {
    TaiKhoanID: string,
    HoVaTen: string,
    TenDangNhap: string,
    NgaySinh: string,
    CMND: string,
    CCCD: string,
    DienThoai: string,
    MaDinhDanh: string,
    TenDonVi: string,
    ChucVu: string,
    BoPhan: string,
    ChuyenTrach: boolean
}

export interface IPlant {
    id: number,
    sttbanghi: number,
    kehoach: string,
    noidung: string,
    kehoachtungay: string,
    kehoachdenngay: string,
    donvi: string,
    tendonvi: string,
    donvikhac: string,
    lucluong: string,
    filedanhsach: string,
    maquanhuyen: string,
    tenmaquanhuyen: string,
    maxaphuong: string,
    tenmaxaphuong: string,
    thonto: string,
    tenthonto: string,
    diachi: string,
    kinhdo: string,
    vido: string,
    motavitri: string,
    anhvitri: string,
    thoigianbatdau: string,
    thoigianketthuc: string,
    motatrienkhai: string,
    hinhanhketqua: string,
    trangthaithuchien: string,
    tentrangthaithuchien: string,
    slracthai: string,
    slnguoithamgia: string,
    tongluotlike: number,
    username:  string,
    hovaten: string,
    ngaycapnhat: string,
    stttt_luoihinhanhchunhatxanh: IHinhAnhChuNhatXanh[],
    stttt_danhsachbinhluan: any[]
    ghichu: string,
    trangthaihienthi: string
}

export interface IHinhAnhChuNhatXanh {
    id: number,
    ghichu: string,
    hinhanhdinhkem: string,
    id_cnx: number,
    tenid_cnx: number
}

export interface IThongTinTaiKhoanVneID {
    creator: string,
    birthdate: string,
    huecitUsername: string,
    name:  string,
    gender: number,
    given_name: string,
    identityPapers: IdentityPapers[]
}

export interface IdentityPapers {
    type: string,
    idNumber: string
}
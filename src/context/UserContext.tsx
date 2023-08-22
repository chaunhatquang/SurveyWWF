import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { IThongTinTaiKhoanVneID } from '../../define';
import { fetchThongTinTaiKhoanVNeID } from '../services/apis';

interface UserContextProps {
    userInfo: IThongTinTaiKhoanVneID | null;
}

const BASE_URL = "https://sso.huecity.vn/auth/realms/hues/protocol/openid-connect/";

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface UserProviderProps {
    children: ReactNode;
    token: string; // Thêm kiểu dữ liệu cho tham số token
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, token }) => {
    const [userInfo, setUserInfo] = useState<IThongTinTaiKhoanVneID | null>(null);
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response: any = await fetchThongTinTaiKhoanVNeID(BASE_URL, token);
                if (response) {
                    setUserInfo(response);
                } else {
                    Alert.alert("Đã hết phiên truy cập");
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{ userInfo }}>
            {children}
        </UserContext.Provider>
    );
};
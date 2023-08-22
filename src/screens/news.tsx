import React, { useEffect, useState } from "react";
import { IThongTinTaiKhoanVneID } from "../../define";
import { fetchData, fetchThongTinTaiKhoanVNeID } from "../services/apis";
import config from '../Config/config.json';
import { paramDistrict, paramsConfirm, paramsJob, paramsOldRange, paramsQuestionOne, paramsRabbitPoint, paramsRabbitType, paramsSocialNetWork, paramsSuggestResult, paramsSurveys } from "../params";
import Toast from "react-native-root-toast";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "@rneui/themed";
import InputCustom from "../common/InputCustom";
import DynamicPicker from "../common/MultiPicker";
import FastImage from "react-native-fast-image";
import ComponentAddNewSurvey from "./AddNewSurvey";

const BASE_URL = config.BASE_URL;

const NewScreen = ({ route }: { route: any }) => {
    const token = route.params.token.token;
    const [socialNetWorkAnother, setSocialNetWorkAnother] = useState("");
    const [rabbitTypeAnother, setRabbitTypeAnother] = useState("");
    const [rabbitPoint, setRabbitPoint] = useState("");
    const [suggestResultAnother, setSuggestResultAnother] = useState("");
    const [surveys, setSurveys] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<IThongTinTaiKhoanVneID | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchAllQuestions = async () => {
            await Promise
                .all([
                    fetchData(BASE_URL, paramsSocialNetWork),
                    fetchData(BASE_URL, paramsRabbitType),
                    fetchData(BASE_URL, paramsRabbitPoint),
                    fetchData(BASE_URL, paramsSuggestResult),
                    fetchData(BASE_URL, paramsConfirm),
                    fetchData(BASE_URL, paramsOldRange),
                    fetchData(BASE_URL, paramsSurveys),
                    fetchThongTinTaiKhoanVNeID("https://sso.huecity.vn/auth/realms/hues/protocol/openid-connect/", token)
                ])
                .then((res: any[]) => {
                    setLoading(false);
                    if (res.length !== 0) {
                        // setSocialNetWork(res[0].data);
                        // setRabbitType(res[1].data);
                        // setRabbitPoint(res[2].data);
                        // setSuggestResult(res[3].data);
                        // setConfirm(res[4].data);
                        // setOldRange(res[5].data);
                        setSurveys(res[6].data);
                        setUserInfo(res[7]);
                    } else {
                        Toast.show("Đã xảy ra lỗi");
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    if (__DEV__)
                        console.log(err);
                })
        }
        fetchAllQuestions();
        return () => {

        }
    }, [])

    // Find the user's CITIZEN identity paper
    const userCitizenIdentity = userInfo?.identityPapers.find((paper) => paper.type === 'CITIZEN');

    ///Check if user has completed a survey
    // Check if user has completed a survey
    const userHasCompletedSurvey = surveys.some((survey) => {
        return (
            survey.dakhaosat === "True" &&
            userInfo?.identityPapers.some(
                (identity) => identity.type === "CITIZEN" && identity.idNumber === survey.username
            )
        );
    });

    if (loading) {
        return <ActivityIndicator size={'small'} color={'red'} />
    } else if (surveys.length === 0) {
        // Render the new survey form component
        return <ComponentAddNewSurvey user = {userInfo} />;
    } else if (userInfo && userHasCompletedSurvey && userCitizenIdentity) {
        Toast.show("Bạn đã khảo sát rồi.Vui lòng xem lại thông tin khảo sát");
        const userSurvey = surveys.find((survey) => survey.username === userCitizenIdentity.idNumber);
        const {
            tengioitinh,
            tendotuoi,
            tenmaquanhuyen,
            tenmaxaphuong,
            tennghenghiephientai,
            tenthongtinchuongtrinh,
            kenhtruyenthong,
            thuchienphanloairac,
            tenthongtindiemthugom,
            vieccanlamdedonghqua,
            hoatdonggiamracthai,
            thongtinctrinhkhac,
            kenhtruyenthongkhac,
            thienploairackhac,
            ttindiemthugomkhac,
            vieccanlamkhac,
            hdongkhac
        } = userSurvey;
        
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 12 }}>
                        <FastImage source={{ uri: 'https://quang.bf.edu.vn/ImageUpload/SurveyWWF/khaosatlogo.png' }} resizeMode="contain" style={{ height: 100 }} />
                        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18 }}>Thông tin bạn đã khảo sát</Text>
                        <Text style={{ textAlign: 'justify', marginVertical: 5 }}>Giới tính</Text>
                        <DynamicPicker label="Giới tính" showLabel={false} placeholder={tengioitinh} endpointsParams={null} value={tengioitinh} onChangeValue={(item) => {
                            const idGender = item?.id.toString();
                            // setOldRange(idGender);
                        }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                        <Text style={{ textAlign: 'justify', marginVertical: 5 }}>Độ tuổi</Text>
                        <DynamicPicker showLabel={false} placeholder={tendotuoi} endpointsParams={paramsOldRange} label="" value={"id"} onChangeValue={(item) => {
                            const idOld = item?.id.toString();
                            // setGender(idOld);
                        }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                        <Text style={{ textAlign: 'justify', marginVertical: 5 }}>Quận/huyện</Text>
                        <DynamicPicker showLabel={false} placeholder={tenmaquanhuyen} endpointsParams={null} label={"tenquanhuyen"} value={"maquanhuyen"} onChangeValue={(item) => {
                            const idDistrict = item?.maquanhuyen;
                            // setDistrict(idDistrict);
                        }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                        <Text style={{ textAlign: 'justify', marginVertical: 5 }}>Phường/xã</Text>
                        <DynamicPicker showLabel={false} placeholder={tenmaxaphuong} endpointsParams={null} label={"tenquanhuyen"} value={"maquanhuyen"} onChangeValue={(item) => {
                            const idDistrict = item?.maquanhuyen;
                            // setDistrict(idDistrict);
                        }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                        <Text style={{ textAlign: 'justify', marginVertical: 5 }}>Nghề nghiệp</Text>
                        <DynamicPicker showLabel={false} placeholder={tennghenghiephientai} endpointsParams={null} label={"tennghenghiep"} value={"id"} onChangeValue={(item) => {
                            const idJob = item?.id.toString();
                            // setJob(idJob);
                        }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                        <Text style={{ marginVertical: 10, fontWeight: '700' }}>1.Ông/Bà có biết chương trình phân loại rác sinh hoạt tại nguồn của thành phố Huế không?</Text>
                        {/* <InputCustom placeholder={"Nhập ý kiến khác"} value={jobAnother} handleInputChange={(value) => setJobAnother(value)} /> */}
                        {thongtinctrinhkhac === "" && <DynamicPicker placeholder={tenthongtinchuongtrinh} endpointsParams={null} label={"dapan"} value={"id"} onChangeValue={(item) => {
                            const idQuestionOne = item?.id.toString();
                            // setQuestionOne(idQuestionOne);
                        }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />}
                        {thongtinctrinhkhac !== "" && (<InputCustom editable={false} placeholder={thongtinctrinhkhac} value={socialNetWorkAnother} handleInputChange={(value) => setSocialNetWorkAnother(value)} />)}
                        {/* <InputCustom placeholder={"Nhập ý kiến khác"} value={questionOneAnother} handleInputChange={(value) => setQuestionOneAnother(value)} /> */}
                        <Text style={{ marginVertical: 10, fontWeight: '700' }}>2.Nếu có, ông/bà đã nhận được thông tin qua kênh truyền thông nào? (có thể chọn nhiều đáp án)</Text>
                        {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                            {kenhtruyenthong.map((item: any) => (
                                <View key={item.eformid} style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox
                                            checked={true}
                                            onPress={() => { }}
                                        />
                                        <Text>{item.kenhtruyenthong}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>}
                        {kenhtruyenthongkhac !== "" && <InputCustom editable={false} placeholder={kenhtruyenthongkhac} value={socialNetWorkAnother} handleInputChange={(value) => setSocialNetWorkAnother(value)} />}
                        <Text style={{ marginVertical: 10, fontWeight: '700' }}>3.Hiện tại, Ông/Bà có thực hiện phân loại rác tại hộ gia đình không? (có thể chọn nhiều đáp án)</Text>
                        {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                            {thuchienphanloairac.map((item: any) => (
                                <View key={item.eformid} style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox
                                            checked={true}
                                            onPress={() => { }}
                                        />
                                        <Text>{item.hinhthucphanloai}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>}
                        {thienploairackhac !== "" && <InputCustom placeholder={thienploairackhac} value={rabbitTypeAnother} handleInputChange={(value) => setRabbitTypeAnother(value)} editable={false} />}
                        <Text style={{ marginVertical: 10, fontWeight: '700' }}>4.Ông/Bà có biết thông tin về các điểm thùng thu gom rác sinh hoạt sau phân loại (3 thùng màu cam, màu ghi, màu trắng) không?</Text>
                        {ttindiemthugomkhac === "" ? <DynamicPicker placeholder={tenthongtindiemthugom} endpointsParams={null} label={"dapancau4"} value={"id"} onChangeValue={(item) => {
                            const idRabbitPoint = item?.id.toString();
                            setRabbitPoint(idRabbitPoint);
                        }} edit={false} labelButton={""} handlePressButton={() => null} show={false} /> : null}
                        {ttindiemthugomkhac !== "" && <InputCustom editable={false} placeholder={ttindiemthugomkhac} value={suggestResultAnother} handleInputChange={(value) => setSuggestResultAnother(value)} />}
                        <Text style={{ marginVertical: 10, fontWeight: '700' }}>5.Theo ông/bà, các cơ quan chức năng nên làm gì để việc triển khai phân loại rác sinh hoạt tại nguồn trên địa bàn thành phố Huế được hiệu quả hơn? (có thể lựa chọn nhiều đáp án)</Text>
                        {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                            {vieccanlamdedonghqua.map((item: any) => (
                                <View key={item.eformid} style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CheckBox
                                            checked={true}
                                            onPress={() => { }}
                                        />
                                        <Text>{item.vieccanlam}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>}
                        {vieccanlamkhac !== "" && <InputCustom editable={false} placeholder={vieccanlamkhac} value={suggestResultAnother} handleInputChange={(value) => setSuggestResultAnother(value)} />}
                        <Text style={{ marginVertical: 10, fontWeight: '700' }}>6.Chính quyền các cấp đang nỗ lực cải thiện công tác quản lý chất thải rắn và giảm thiểu rác thải nhựa do các tác động của rác thải nhựa tới môi trường và sức khỏe con người. Ông/Bà có đồng ý sẽ cùng thực hiện các hoạt động sau đây không? (đánh dấu vào hành động cam kết, có thể lựa chọn nhiều đáp án)</Text>
                        {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                            {hoatdonggiamracthai.map((item: any) => (
                                <View key={item.eformid} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                        <CheckBox
                                            checked={true}
                                            onPress={() => { }}
                                        />
                                        <Text>{item.tenhoatdong}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>}
                        {hdongkhac !== "" && <InputCustom editable={false} placeholder={hdongkhac} value={suggestResultAnother} handleInputChange={(value) => setSuggestResultAnother(value)} />}
                    </View>
                    {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={handlerSendSurvey} buttonStyle={{ borderRadius: 8 }} style={{ width: '35%' }}>Gửi khảo sát</Button>
                </View> */}
                </ScrollView>
            </SafeAreaView>
        )
    } else if (userInfo) {
        // Render the new survey form component
        return <ComponentAddNewSurvey user={userInfo} />;
    } else {
        return <Text>Error loading data</Text>;
    }
}

export default NewScreen;

interface ISocialNetwork {
    id: number,
    kenhtruyenthong: string,
    checked: boolean
}

interface IRabbitType {
    id: number,
    hinhthucphanloai: string,
    checked: boolean
}
interface ISuggestResult {
    id: number,
    vieccanlam: string,
    checked: boolean
}
interface IConfirm {
    id: number,
    tenhoatdong: string,
    checked: boolean
}
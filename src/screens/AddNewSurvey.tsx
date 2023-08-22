import React, { useEffect, useState } from "react";
import { IPhuongXa, IThongTinTaiKhoanVneID } from "../../define";
import { fetchData, fetchPhuongXa, fetchThongTinTaiKhoanVNeID, updateData } from "../services/apis";
import config from '../Config/config.json';
import { paramDistrict, paramGender, paramsConfirm, paramsJob, paramsOldRange, paramsQuestionOne, paramsRabbitPoint, paramsRabbitType, paramsSocialNetWork, paramsSuggestResult, paramsSurveys } from "../params";
import Toast from "react-native-root-toast";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import InputCustom from "../common/InputCustom";
import DynamicPicker, { styles } from "../common/MultiPicker";
import FastImage from "react-native-fast-image";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";

const BASE_URL = config.BASE_URL;

const ComponentAddNewSurvey = (user: any) => {

    if (user === null) {
        return <ActivityIndicator size={'small'} color={'red'} />
    }

    const [gender, setGender] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState<IPhuongXa[]>([]);
    const [wardValue, setWardValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [job, setJob] = useState("");
    const [questionOne, setQuestionOne] = useState("");
    const [questionOneAnother, setQuestionOneAnother] = useState("");
    const [socialNetWork, setSocialNetWork] = useState<ISocialNetwork[]>([]);
    const [socialNetWorkAnother, setSocialNetWorkAnother] = useState("");
    const [rabbitType, setRabbitType] = useState<IRabbitType[]>([]);
    const [rabbitTypeAnother, setRabbitTypeAnother] = useState("");
    const [rabbitPoint, setRabbitPoint] = useState("");
    const [rabbitPointAnother, setRabbitPointAnother] = useState("");
    const [suggestResult, setSuggestResult] = useState<ISuggestResult[]>([]);
    const [suggestResultAnother, setSuggestResultAnother] = useState("");
    const [confirm, setConfirm] = useState<IConfirm[]>([]);
    const [confirmAnother, setConfirmAnother] = useState("");
    const [oldRange, setOldRange] = useState("");
    const [selectedSocialNetWork, setSelectedSocialNetWork] = useState<number[]>([]);
    const [selectedRabbitType, setSelectedRabbitType] = useState<number[]>([]);
    const [selectedSuggestResult, setSelectedSuggestResult] = useState<number[]>([]);
    const [selectedConfirm, setSelectedConfirm] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [surveys, setSurveys] = useState<any[]>([]);
    const [hasSurvey, setHasSurvey] = useState(false);
    const [placeHolderDistrict, setPlaceHolderDistrict] = useState("");
    const [placeHolderWard, setPlaceHolderWard] = useState("");
    // const [userInfo, setUserInfo] = useState<IThongTinTaiKhoanVneID | null>(null);
    const navigation = useNavigation<any>();
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        setLoading(true);
        const initialPhoneNumber = getPhone();
        setPhoneNumber(initialPhoneNumber);
        const fetchAllQuestions = async () => {
            await Promise
                .all([
                    fetchData(BASE_URL, paramsSocialNetWork),
                    fetchData(BASE_URL, paramsRabbitType),
                    fetchData(BASE_URL, paramsRabbitPoint),
                    fetchData(BASE_URL, paramsSuggestResult),
                    fetchData(BASE_URL, paramsConfirm),
                    // fetchData(BASE_URL, paramsOldRange),
                    // fetchData(BASE_URL, paramsSurveys),
                    // fetchThongTinTaiKhoanVNeID("https://sso.huecity.vn/auth/realms/hues/protocol/openid-connect/", token)
                ])
                .then((res: any[]) => {
                    setLoading(false);
                    if (res.length !== 0) {
                        setSocialNetWork(res[0].data);
                        setRabbitType(res[1].data);
                        setRabbitPoint(res[2].data);
                        setSuggestResult(res[3].data);
                        setConfirm(res[4].data);
                        // setOldRange(res[5].data);
                        // setSurveys(res[6].data);
                        // setUserInfo(res[7]);
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

    useEffect(() => {
        const fetchWardById = async () => {
            const res: any = await fetchPhuongXa(BASE_URL, district);
            if (res && res.data) {
                setWard(res.data);
            } else {
                return []
            }
        }
        fetchWardById();
        return () => {

        }
    }, [district])

    const handleCheckboxToggleSocialNetWork = (item: ISocialNetwork) => {
        const updatedList = socialNetWork.map((checkboxItem) => {
            if (checkboxItem.id === item.id) {
                return { ...checkboxItem, checked: !checkboxItem.checked };
            }
            return checkboxItem;
        });
        setSocialNetWork(updatedList);

        if (item.checked) {
            setSelectedSocialNetWork(selectedSocialNetWork.filter((id) => id !== item.id));
        } else {
            setSelectedSocialNetWork([...selectedSocialNetWork, item.id]);
        }
    };

    const handleCheckboxToggleRabbitType = (item: IRabbitType) => {
        const updatedList = rabbitType.map((checkboxItem) => {
            if (checkboxItem.id === item.id) {
                return { ...checkboxItem, checked: !checkboxItem.checked };
            }
            return checkboxItem;
        });
        setRabbitType(updatedList);

        if (item.checked) {
            setSelectedRabbitType(selectedRabbitType.filter((id) => id !== item.id));
        } else {
            setSelectedRabbitType([...selectedRabbitType, item.id]);
        }
    };

    const handleCheckboxSuggestResult = (item: ISuggestResult) => {
        const updatedList = suggestResult.map((checkboxItem) => {
            if (checkboxItem.id === item.id) {
                return { ...checkboxItem, checked: !checkboxItem.checked };
            }
            return checkboxItem;
        });
        setSuggestResult(updatedList);

        if (item.checked) {
            setSelectedSuggestResult(selectedSuggestResult.filter((id) => id !== item.id));
        } else {
            setSelectedSuggestResult([...selectedSuggestResult, item.id]);
        }
    };

    const handleCheckboxConfirm = (item: IConfirm) => {
        const updatedList = confirm.map((checkboxItem) => {
            if (checkboxItem.id === item.id) {
                return { ...checkboxItem, checked: !checkboxItem.checked };
            }
            return checkboxItem;
        });
        setConfirm(updatedList);

        if (item.checked) {
            setSelectedConfirm(selectedConfirm.filter((id) => id !== item.id));
        } else {
            setSelectedConfirm([...selectedConfirm, item.id]);
        }
    };

    function getCitizenIdNumber() {
        let citizenIdNumber = null;

        if (user !== null && user.user !== null && user.user.identityPapers !== null) {
            for (const paper of user.user.identityPapers) {
                if (paper.type === "CITIZEN") {
                    citizenIdNumber = paper.idNumber;
                    break; // Dừng vòng lặp khi tìm thấy giá trị
                }
            }
        }

        return citizenIdNumber;
    }

    function getAddress() {
        let address = null;

        if (user !== null && user.user !== null && user.user.addresses !== null) {
            const nowAddress = user.user.addresses.find((address: any) => address.type === "NOW");
            address = nowAddress;
        }

        return address;
    }

    function getPhone() {
        let phoneNumber = null;
        if (user !== null && user.user !== null && user.user.identityPapers !== null) {
            phoneNumber = user.user.phone;
        }

        return phoneNumber;
    }


    const address = getAddress();
    let districtName = "";
    let wardName = "";
    let districtId = "";
    let wardId = "";
    if (address !== null) {
        districtName = address.districtName;
        wardName = address.wardName;
        districtId = address.districtId;
        wardId = address.wardId;
    }

    const handlerSendSurvey = async () => {

        if (job === "" || questionOne === "" || socialNetWork.length === 0 || rabbitPoint === "" || rabbitType.length === 0 || suggestResult.length === 0 || confirm.length === 0 || oldRange === "") {
            Toast.show("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const formData = new FormData();
        const CCCD = getCitizenIdNumber();
        const phone = getPhone();

        formData.append("serviceid", "2NiCAit3gHQRzTHh3wl11A==");
        formData.append("eformid", 0);
        formData.append("username", CCCD);
        formData.append("sdt", phoneNumber);
        formData.append("hovaten", user.user.name);
        formData.append("dotuoi", oldRange);
        formData.append("gioitinh", gender);
        formData.append("maquanhuyen", district === "" ? districtId : district);
        formData.append("maxaphuong", wardValue === "" ? wardId : wardValue);
        formData.append("nghenghiephientai", job);
        formData.append("dakhaosat", "True");
        if (questionOneAnother !== "") {
            formData.append("thongtinctrinhkhac", questionOneAnother);
        }
        formData.append("thongtinchuongtrinh", questionOne);


        if (socialNetWorkAnother !== "") {
            formData.append("kenhtruyenthongkhac", socialNetWorkAnother);
        }
        formData.append("kenhtruyenthong", selectedSocialNetWork.toString());


        if (rabbitTypeAnother !== "") {
            formData.append("thienploairackhac", rabbitTypeAnother);
        }
        formData.append("thuchienphanloairac", selectedRabbitType.toString());


        if (rabbitPointAnother !== "") {
            formData.append("ttindiemthugomkhac", rabbitPointAnother);
        }
        formData.append("thongtindiemthugom", rabbitPoint);


        if (suggestResultAnother !== "") {
            formData.append("vieccanlamkhac", suggestResultAnother);
        }
        formData.append("vieccanlamdedonghqua", selectedSuggestResult.toString());


        if (confirmAnother !== "") {
            formData.append("hdongkhac", confirmAnother);
        }
        formData.append("hoatdonggiamracthai", selectedConfirm.toString());

        const res: any = await updateData(BASE_URL, formData);
        const { code, message, data } = res;
        if (res && code === 0) {
            Toast.show("Gửi khảo sát thành công!");
            // navigation.goBack();

        } else {
            Toast.show(`Gửi khảo sát thất bại! ${message}`);
        }
    }

    const isCheckbox7Selected = socialNetWork.find((item) => item.id === 7)?.checked;
    const isCheckbox6Selected = rabbitType.find((item) => item.id === 6)?.checked;
    const isCheckbox10SelectedSuggest = suggestResult.find((item) => item.id === 10)?.checked;
    const isCheckbox10SelectedConfirm = confirm.find((item) => item.id === 10)?.checked;

    const [checkCCCD, setCheckCCCD] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ marginHorizontal: 12 }}>
                    <FastImage source={{ uri: 'https://quang.bf.edu.vn/ImageUpload/SurveyWWF/khaosatlogo.png' }} resizeMode="contain" style={{ height: 100 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            checked={checkCCCD}
                            onPress={() => {
                                setCheckCCCD(!checkCCCD);
                                const tempPhone = getPhone();
                                setPhoneNumber(tempPhone);
                            }}
                        />
                        <Text style={{ width: "80%", marginVertical: 10 }}>Trường hợp Ông/ Bà muốn tham gia chương trình quay thưởng vui lòng cung cấp thêm thông tin số điện thoại.</Text>
                    </View>
                    {checkCCCD && <InputCustom editable={true} placeholder="Số điện thoại" value={phoneNumber} handleInputChange={(value) => setPhoneNumber(value)} />}
                    <DynamicPicker placeholder="Giới tính" endpointsParams={paramGender} label={"tengioitinh"} value={"magioitinh"} onChangeValue={(item) => {
                        const idGender = item?.magioitinh;
                        setGender(idGender);
                    }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                    <DynamicPicker placeholder="Tuổi" endpointsParams={paramsOldRange} label={"dotuoi"} value={"id"} onChangeValue={(item) => {
                        const idOld = item?.id.toString();
                        setOldRange(idOld);
                    }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                    <DynamicPicker placeholder={districtName} endpointsParams={paramDistrict} label={"tenquanhuyen"} value={"maquanhuyen"} onChangeValue={(item) => {
                        const idDistrict = item?.maquanhuyen;
                        setDistrict(idDistrict);
                    }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                    <View style={styles.container}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'red' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={ward}
                            search
                            maxHeight={300}
                            // disable={edit}
                            labelField={"tenphuongxa"}
                            valueField={"maphuongxa"}
                            placeholder={wardName}
                            searchPlaceholder="Tìm..."
                            value={""}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item) => {
                                const idWard = item?.maphuongxa
                                setWardValue(idWard);
                            }}
                        />
                    </View>
                    <DynamicPicker placeholder="Nghề nghiệp" endpointsParams={paramsJob} label={"tennghenghiep"} value={"id"} onChangeValue={(item) => {
                        const idJob = item?.id.toString();
                        setJob(idJob);
                    }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                    <Text style={{ marginVertical: 10, fontWeight: '700' }}>1.Ông/Bà có biết chương trình phân loại rác sinh hoạt tại nguồn của thành phố Huế không?</Text>
                    <DynamicPicker placeholder="Chọn" endpointsParams={paramsQuestionOne} label={"dapan"} value={"id"} onChangeValue={(item) => {
                        const idQuestionOne = item?.id.toString();
                        setQuestionOne(idQuestionOne);
                    }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                    {questionOne === "4" && <InputCustom placeholder={"Nhập ý kiến khác"} value={questionOneAnother} handleInputChange={(value) => setQuestionOneAnother(value)} />}
                    <Text style={{ marginVertical: 10, fontWeight: '700' }} >2.Nếu có, ông/bà đã nhận được thông tin qua kênh truyền thông nào? (có thể chọn nhiều đáp án)</Text>
                    {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                        {socialNetWork.map((item) => (
                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox
                                        checked={item.checked}
                                        onPress={() => handleCheckboxToggleSocialNetWork(item)}
                                    />
                                    <Text>{item.kenhtruyenthong}</Text>
                                </View>
                            </View>
                        ))}

                        {isCheckbox7Selected && (
                            <InputCustom
                                placeholder={"Nhập ý kiến khác"}
                                value={socialNetWorkAnother}
                                handleInputChange={(value) => setSocialNetWorkAnother(value)}
                            />
                        )}
                    </View>}
                    {/* {selectedSocialNetWork.toString() === "7" && <InputCustom placeholder={"Nhập ý kiến khác"} value={socialNetWorkAnother} handleInputChange={(value) => setSocialNetWorkAnother(value)} />} */}
                    <Text style={{ marginVertical: 10, fontWeight: '700' }}>3.Hiện tại, Ông/Bà có thực hiện phân loại rác tại hộ gia đình không? (có thể chọn nhiều đáp án)</Text>
                    {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                        {rabbitType.map(item => (
                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox
                                        checked={item.checked}
                                        onPress={() => handleCheckboxToggleRabbitType(item)}
                                    />
                                    <Text>{item.hinhthucphanloai}</Text>
                                </View>
                            </View>
                        ))}
                    </View>}
                    {isCheckbox6Selected && <InputCustom placeholder={"Nhập ý kiến khác"} value={rabbitTypeAnother} handleInputChange={(value) => setRabbitTypeAnother(value)} />}
                    <Text style={{ marginVertical: 10, fontWeight: '700' }}>4.Ông/Bà có biết thông tin về các điểm thùng thu gom rác sinh hoạt sau phân loại (3 thùng màu cam, màu ghi, màu trắng) không?:*</Text>
                    <DynamicPicker placeholder="Chọn" endpointsParams={paramsRabbitPoint} label={"dapancau4"} value={"id"} onChangeValue={(item) => {
                        const idRabbitPoint = item?.id.toString();
                        setRabbitPoint(idRabbitPoint);
                    }} edit={false} labelButton={""} handlePressButton={() => null} show={false} />
                    {rabbitPoint === "4" && <InputCustom placeholder={"Nhập ý kiến khác"} value={rabbitPointAnother} handleInputChange={(value) => setRabbitPointAnother(value)} />}
                    <Text style={{ marginVertical: 10, fontWeight: '700' }}>5.Theo ông/bà, các cơ quan chức năng nên làm gì để việc triển khai phân loại rác sinh hoạt tại nguồn trên địa bàn thành phố Huế được hiệu quả hơn? (có thể lựa chọn nhiều đáp án)</Text>
                    {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                        {suggestResult.map(item => (
                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox
                                        checked={item.checked}
                                        onPress={() => handleCheckboxSuggestResult(item)}
                                    />
                                    <Text>{item.vieccanlam}</Text>
                                </View>
                            </View>
                        ))}
                    </View>}
                    {isCheckbox10SelectedSuggest && <InputCustom placeholder={"Nhập ý kiến khác"} value={suggestResultAnother} handleInputChange={(value) => setSuggestResultAnother(value)} />}
                    <Text style={{ marginVertical: 10, fontWeight: '700' }}>6.Chính quyền các cấp đang nỗ lực cải thiện công tác quản lý chất thải rắn và giảm thiểu rác thải nhựa do các tác động của rác thải nhựa tới môi trường và sức khỏe con người. Ông/Bà có đồng ý sẽ cùng thực hiện các hoạt động sau đây không? (đánh dấu vào hành động cam kết, có thể lựa chọn nhiều đáp án)</Text>
                    {loading ? <ActivityIndicator size={'small'} color={'red'} /> : <View>
                        {confirm.map(item => (
                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                    <CheckBox
                                        checked={item.checked}
                                        onPress={() => handleCheckboxConfirm(item)}
                                    />
                                    <Text>{item.tenhoatdong}</Text>
                                </View>
                            </View>
                        ))}
                    </View>}
                    {isCheckbox10SelectedConfirm && <InputCustom placeholder={"Nhập ý kiến khác"} value={confirmAnother} handleInputChange={(value) => setConfirmAnother(value)} />}
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button onPress={handlerSendSurvey} buttonStyle={{ borderRadius: 8 }} style={{ width: '35%' }}>Gửi khảo sát</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ComponentAddNewSurvey;

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
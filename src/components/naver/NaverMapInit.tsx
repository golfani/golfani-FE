import Script from 'next/script'
import {useEffect} from "react";
import {useQuery} from "react-query";
import {getMap, IMapDto} from "src/apis/Map";
import {IShopDto} from "src/apis/Shop";

const clientId = 'tekcukac4f';

interface INaverMapInitProps {
    regCode: number
    shopList: IShopDto[]
}

const NaverMapInit = ({regCode, shopList}: INaverMapInitProps): JSX.Element => {
    const mapQuery = useQuery<IMapDto>(['map', regCode], () => getMap(regCode));

    const naverCallback = async () => {
        const map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.2787794, 126.95581),
            zoom: 12
        })

        const createMarker = () => {
            shopList.map((shop) => {
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(shop.longitude, shop.latitude),
                    map: map
                });
                const infoWindow = new naver.maps.InfoWindow({
                    content: '<div class="marker_box">' +
                        '<div class="marker_info_box">' +
                        '<span class="marker_shop_name_txt">' + shop.shopName + '</span>' +
                        '<span class="marker_shop_sub_txt">' + '⭐️ 4.5 (100)' + '</span>' +
                        '<span class="marker_shop_sub_txt">' + shop.location + '</span>' +
                        '<span class="marker_shop_sub_txt">' + shop.subLocation + '</span>' +
                        '</div>' +
                        '<img class="marker_shop_img" src=' + shop.imgSrc + '/>' +
                        '</div>',
                });
                naver.maps.Event.addListener(marker, 'click', () => {
                    infoWindow.getMap() ? infoWindow.close() : infoWindow.open(map, marker)
                });
            })
        }
        createMarker();
    }

    useEffect(() => {
        if (typeof naver != "undefined")
            naver && naverCallback();
    }, [])

    useEffect(() => {
        if (typeof naver != "undefined")
            naver && naverCallback();
    }, [shopList])

    return (
        <div>
            <Script src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`}
                    onLoad={naverCallback}/>
            <div id='map' style={{width: '100%', height: 400}}>

            </div>
        </div>
    );
};

export default NaverMapInit;

import Script from 'next/script'

const NaverMapInit = (): JSX.Element => {
    const clientId = 'tekcukac4f';

    const naverCallback = async () => {
        const map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.3089444, 127.0025879),
            zoom: 15
        })

        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.3089444, 127.0025879),
            map: map
        })

        const infoWindow = new naver.maps.InfoWindow({
            content: '<div class="marker_box">' +
                '<div class="marker_info_box">' +
                    '<span class="marker_shop_name_txt">아일랜드골프 수원 인계점</span>' +
                    '<span class="marker_shop_sub_txt">수원시 장안구 조원동 16-9</span>' +
                    '<button class="marker_btn">스토어 이동</button>' +
                '</div>' +
                '<img class="marker_shop_img" src="golfShop_img2.jpeg"/>' +
                '</div>',
        });

        naver.maps.Event.addListener(marker, 'click', () => {
            infoWindow.getMap() ? infoWindow.close() : infoWindow.open(map, marker)
        })
    }

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

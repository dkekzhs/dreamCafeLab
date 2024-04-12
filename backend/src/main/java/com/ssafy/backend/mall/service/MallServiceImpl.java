package com.ssafy.backend.mall.service;

import com.ssafy.backend.mall.model.Vo.MallAverageVo;
import com.ssafy.backend.mall.model.Vo.MallAverageVoInterface;
import com.ssafy.backend.mall.model.Vo.MallVo;
import com.ssafy.backend.mall.model.domain.Mall;
import com.ssafy.backend.mall.model.dto.RequestPointRadiusDto;
import com.ssafy.backend.mall.model.dto.RequestPolygonDto;
import com.ssafy.backend.mall.model.repository.DongRepository;
import com.ssafy.backend.mall.model.repository.GuRepository;
import com.ssafy.backend.mall.model.repository.MallRepository;
import com.ssafy.backend.mall.model.repository.SangRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MallServiceImpl implements MallService{
    private final GuRepository guRepository;
    private final DongRepository dongRepository;
    private final SangRepository sangRepository;
    private final MallRepository mallRepository;
    @Override
    public List<MallVo> getMalls() {
        List<Mall> all = mallRepository.findAll();
        return all.parallelStream().map(Mall::toVo).collect(Collectors.toList());
    }

    @Override
    @Cacheable(value = "Contents", key = "#code", cacheManager = "mallCacheManager")
    public MallAverageVo getAverageMallsRentsByPointInGu(int code) {
        List<MallAverageVoInterface> vo = mallRepository.findAverageGu(code);

        MallAverageVoInterface data = vo.get(0);
        return interfaceToVo(data);
    }
    @Override
    @Cacheable(value = "Contents", key = "#code", cacheManager = "mallCacheManager")
    public MallAverageVo getAverageMallsRentsByPointInDong(int code) {
        List<MallAverageVoInterface> vo = mallRepository.findAverageDong(code);
        MallAverageVoInterface data = vo.get(0);
        return interfaceToVo(data);
    }

    @Override
    @Cacheable(value = "Contents", key = "#code", cacheManager = "mallCacheManager")
    public MallAverageVo getAverageMallsRentsByPointInSang(int code) {
        List<MallAverageVoInterface> vo = mallRepository.findAverageSang(code);
        MallAverageVoInterface data = vo.get(0);
        return interfaceToVo(data);
    }

    @Override
    public MallAverageVo getAverageMallsPoint(RequestPointRadiusDto dto) {
        String pointWKT = String.format("POINT(%f %f)", dto.getLat(), dto.getLng());
        List<MallAverageVoInterface> vo = mallRepository.findAveragePointAndRadius(pointWKT, dto.getRadius());
        if(vo.get(0).getPrc() ==null){
            vo = mallRepository.findAveragePointAndRadius(pointWKT, dto.getRadius() * 10);
        }
        MallAverageVoInterface data = vo.get(0);
        return interfaceToVo(data);
    }

    @Override
    public MallAverageVo getAverageMallPolygon(RequestPolygonDto dto) {
        String polygon = convertCoordinatesToWKT(dto.getCoordinates());
        List<MallAverageVoInterface> vo = mallRepository.findAveragePolygon(polygon);
        MallAverageVoInterface data = vo.get(0);
        return interfaceToVo(data);
    }

    @Override
    @Cacheable(value = "Contents", key = "#code", cacheManager = "mallCacheManager")
    public MallAverageVo getGuAverageRentsByName(int code) {
        List<MallAverageVoInterface> vo = mallRepository.findAverageGuByName(code);
        MallAverageVoInterface data = vo.get(0);
        return interfaceToVo(data);
    }

    @Override
    @Cacheable(value = "Contents", key = "#code", cacheManager = "mallCacheManager")
    public MallAverageVo getDongAverageRentsByName(int code) {
        List<MallAverageVoInterface> vo = mallRepository.findAverageDongByName(code);
        MallAverageVoInterface data = vo.get(0);
        return interfaceToVo(data);
    }



    public MallAverageVo interfaceToVo(MallAverageVoInterface data){
        return MallAverageVo.builder()
                .prc(data.getPrc())
                .rentPrc(data.getRentPrc())
                .spec(data.getSpec())
                .build();
    }

    public String convertCoordinatesToWKT(List<List<Double>> coordinates) {
        StringBuilder sb = new StringBuilder("POLYGON((");
        for (List<Double> coordinate : coordinates) {
            sb.append(coordinate.get(1)).append(" ").append(coordinate.get(0)).append(",");
        }
        List<Double> firstCoordinate = coordinates.get(0);
        sb.append(firstCoordinate.get(1)).append(" ").append(firstCoordinate.get(0)).append("))");
        return sb.toString();
    }

    //    public String convertCoordinatesToWKT(Object coordinates) {
    //        StringBuffer sb = new StringBuffer();
    //
    //        if (coordinates instanceof List) {
    //            List<?> list = (List<?>) coordinates;
    //            if (!list.isEmpty()) {
    //                if (list.get(0) instanceof List) {
    //                    // 여기서 list.get(0).get(0) 호출 전에 list.get(0)이 List 인지 확인합니다.
    //                    List<?> firstElement = (List<?>) list.get(0);
    //                    if (!firstElement.isEmpty() && !(firstElement.get(0) instanceof List)) {
    //                        sb.append("POLYGON((");
    //                    } else {
    //                        sb.append("(");
    //                    }
    //
    //                    for (int i = 0; i < list.size(); i++) {
    //                        String part = convertCoordinatesToWKT(list.get(i));
    //                        sb.append(part);
    //                        if (i < list.size() - 1) {
    //                            sb.append(", ");
    //                        }
    //                    }
    //
    //                    if (!firstElement.isEmpty() && !(firstElement.get(0) instanceof List)) {
    //                        sb.append("))");
    //                    } else {
    //                        sb.append(")");
    //                    }
    //                } else if (list.get(0) instanceof Double) {
    //                    Double latitude = (Double) list.get(1);
    //                    Double longitude = (Double) list.get(0);
    //                    sb.append(latitude).append(" ").append(longitude);
    //                }
    //            }
    //        }
    //
    //        return sb.toString();
    //    }
}

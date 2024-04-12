package com.ssafy.backend.common.utils;

import org.geolatte.geom.C2D;
import org.geolatte.geom.Point;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.PrecisionModel;

public class GeoConverter {

    private static final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 0);

    public static org.locationtech.jts.geom.Point convertGeolattePointToJtsPoint(Point<C2D> geolattePoint) {
        if (geolattePoint == null) {
            return null;
        }

        // Geolatte의 좌표를 가져옵니다.
        double x = geolattePoint.getPosition().getX();
        double y = geolattePoint.getPosition().getY();

        // JTS의 좌표 객체를 생성합니다.
        Coordinate coordinate = new Coordinate(x, y);

        // JTS의 Point 객체를 생성합니다.
        return geometryFactory.createPoint(coordinate);
    }


}
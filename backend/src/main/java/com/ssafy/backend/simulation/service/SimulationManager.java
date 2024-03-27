package com.ssafy.backend.simulation.service;

import com.ssafy.backend.districtReport.model.domain.DistrictReport;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SimulationManager {
    Map<Integer, DistrictReport> simulation = new ConcurrentHashMap<>();

    static SimulationManager instance = null;

    public SimulationManager getInstance(){
        if(instance == null){
            instance = new SimulationManager();
        }
        return instance;
    }



}

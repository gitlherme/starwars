import { SWAPIEndpoint } from "./generic-api";

interface ControllerDefs {
  detailData: string[];
}

const controllerData : Map<string, ControllerDefs> = new Map();

controllerData.set('people', {
  detailData: ['name', 'mass', 'hair_color', 'gender', 'skin_color']
})

controllerData.set('films', {
  detailData: ['title', 'director', 'producer', 'opening_crawl']
})

export const getDetailData = (controller:SWAPIEndpoint): string[] | null => {
  const column = controllerData.get(controller);
  if(!column) return null;
  return column.detailData;
}
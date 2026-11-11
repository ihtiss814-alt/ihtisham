import {cachedRequest} from "@/lib/request-cache";
import {isSupabaseConfigured,supabase} from "@/lib/supabase";
import {VEHICLE_DETAIL_SELECT} from "@/lib/vehicle-detail-data";
export function getCachedVehicleDetail(ref:string){
 if(!isSupabaseConfigured||!ref)return Promise.resolve(null);
 return cachedRequest(`vehicle:detail:${ref}`,async()=>{
  const {data,error}=await supabase.from("cars").select(VEHICLE_DETAIL_SELECT).eq("ref_number",ref).maybeSingle();
  if(error)throw error;return data;
 },45000);
}
export function prefetchVehicleDetail(ref:string):void{if(ref&&isSupabaseConfigured)void getCachedVehicleDetail(ref).catch(()=>undefined);}

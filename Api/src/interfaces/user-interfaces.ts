
  export interface plants {
  id? :number,
  name? :string, 
  bunker_number? :number,
  pi_number? :number,
  tunnel_number? :number,
  house_number? :number, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}  

export interface batch_status{
id? :number, 
  name? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface batches {
  id? :string, 
  checks? :number,
  comments? :string, 
  aprove_user? :string, 
  weight_bs? :number,
  weight_bh? :number,
  humidity? :number, 
  nitrogen_percent? :number,
  nitrogen_weight? :number,
  id_plant? :number,
  id_batch_status? :number, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface bunker_fills {
  id? :number,  
  fill? :string, 
  bunker? :string, 
  weight_bh? :number,
  weight_bs? :number,
  fill_equipment? :string, 
  tractor_equipment? :string, 
  start_time? :string 
  final_time? :string 
  total_time? :number, 
  start_measure? :number,
  final_measure? :number,
  m3_water? :number,
  lt_bs? :number,
  status? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  batch_id? :number,
}

export interface bunker_fancom {
  id? :number,  
  tc1? :number,
  tc2? :number,
  tc3? :number,
  tc4? :number,
  tc5? :number,
  tc6? :number,
  fan? :number,
  average? :number,
  final_value? :number,
  phase? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  bunker_fill_id? :number,
}




export interface indicators {
  id? :number,  
  name? :string, 
  min_limit? :number,
  max_limit? :number,
  id_plant? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}




 export interface checks{
  id? :number,  
  result? :number,
  batches_id? :number,
  indicators_id? :number,
  created_at? :string,  
  modified_at? :string,   
  created_by? :string,   
  modified_by? :string,   
}

  export interface material_types{
  id? :number,  
  name? : string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}


export interface material_subtypes{
  id? :number,  
  name? :string, 
  id_material_type? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface providers {
  id? :number,  
  name? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface material_subtype_plants{
  id? :number, 
  id_plant? :number,
  id_material_subtype? :number,
  id_provider? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface lots {
  id? :number,  
  lot? :string, 
  id_material_subtype_plant? :number, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface simple_batchs {
  id? :number,  
  batch_key? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  batch_id? :number,
  batch_status_id? :number, 
}

export interface tunnel_fills {
  id? :number,  
  tunnel? :string, 
  start_time? :string 
  final_time? :string 
  total_time? :number,
  weight_bh? :number,
  ton_min? :number,
  start_measure? :number,
  final_measure? :number,
  m3_water? :number,
  lt_bs? :number,
  status? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  id_simple_batch? :number,
}

export interface ppm_monitorings {
  id? :number,  
  day? :string, 
  sampling_time? :string 
  ppm_nh3? :number,
  water? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  tunnel_fill_id? :number,
}

export interface preformulas {
  id? :number,  
  batch_triple_week? :number,
  tunnels_week? :number,
  tunnel_block? :number,
  blocks_m2? :number,
  tunnel_m2? :number,
  batch_triple_m2? :number,
  tunnel_waste? :number,
  tons_tunnel_planting? :number,
  tons_filling_f2_tunnel? :number,
  kg_bs_m2? :number,
  kg_bh_m2? :number,
  bs_batch? :number,
  plants_id? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}


export interface preformula_destiny_plants {
  id? :number,  
  house_quantity? :number,
  total_blocks? :number,
  humidity? :number,
  weight_bh? :number,
  weight_bs? :number,
  id_preformula? :number,
  id_plant? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  blocks? :string, 
}

export interface prewet_formulas {
  id? :number,  
  total_time? :number,
  m3_total? :number,
  m3_min? :number,
  m3_total_bs? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  batch_id? :number,
}

export interface prewet_laps {
  id? :number,  
  lap? :string, 
  cord? :string, 
  cord_number? :string, 
  operator? :string, 
  equipment? :string, 
  start_time? :string 
  start_measure1? :number,
  start_measure2? :number,
  final_time? :string 
  final_measure1? :number,
  final_measure2? :number,
  temperature_before_lap? :number,
  total_time? :number,
  m3_total? :number,
  m3_min? :number,
  m3_total_bs? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  prewet_formula_id? :number, 
}

export interface questions {
  id? :number,  
  question? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  batch_status_id? :number, 
}

export interface tbll_questionnaire_responses {
  id? :number,  
  questionId? :string, 
  response? :string, 
  comment? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  batch_id? :number,
  simple_batch_id? :number,
  questions_id? :number,
}

export interface roles {
  id? :number,  
  name? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface slurry_instructions {
  id? :number,  
  lap? :string, 
  cord_number? :number,
  additive_lap? :number,
  additive_percent? :number,
  additive_bh? :number,
  length? :number,
  m3_bs? :number,
  m3_lap? :number,
  min_lap? :number,
  velocity_dt? :number,
  time_dt? :number,
  time_dt_teen? :number,
  bomb1? :number,
  bomb2? :number,
  hz? :number,
  id_batch? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface sowing {
  id? :number,  
  blocks? :number, 
  block_weight? :number,
  weight_bh? :number,
  f2_days? :number,
  status? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string,  
  modified_by? :string,  
  simple_batch_id? :number,
}


export interface sowing_details {
  id? :number,  
  destiny_plant? :string, 
  house? :number,
  house_m2? :number,
  seed_id? :number,
  quantity_seed? :number,
  suplement_id? :number,
  quantity_suplements? :number,
  blocks? :number,
  block_weight? :number,
  temperature? :number,
  status? :number, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
  sowing_id? :number,
}

export interface stoppages {
  id? :number,  
  phase? :string, 
  start_time? :string 
  final_time? :string 
  total_time? :number,
  reason? :string, 
  prewet_laps_id? :number,
  bunker_fill_id? :number,
  tunnel_fill_id? :number,
  sowing_id? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

export interface tunnel_fancom {
  id? :number,  
  compost_avg_temp? :number,
  incoming_air_temp? :number,
  new_air? :number,
  circulation? :number,
  tunnel_temp? :number,
  compost_max_temp? :number,
  compost_min_temp? :number,
  phase? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string,   
  modified_by? :string,   
  id_tunnel_fill? :number,
}



export interface userInterface {
  id? :number,  
  user_name? :string, 
  password? :string, 
  name? :string, 
  email? :string, 
  id_role? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}



export interface plants_users {
  id? :number, 
  id_plant? :number,
  id_user? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string,   
  modified_by? :string,   
}


export interface material_list_attributes {
  id? :number, 
  name? :string, 
  value? :string, 
  value_type? :string, 
  id_material_subtype? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}


export interface house_types {
  id? :number, 
  size? :number,
  blocks? :number, 
  block_weight? :number,
  id_plant? :number,
  created_at? :string,  
  modified_at? :string,   
  created_by? :string, 
  modified_by? :string, 
}


export interface lot_list_attributes {
  id? :number, 
  name? :string, 
  value? :string, 
  value_type? :string, 
  id_lot? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}


export interface batch_material_attributes {
  id? :number, 
  name? :string, 
  value? :string, 
  value_type? :string, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}



export interface batch_materials {
  id? :number, 
  batches_id? :number,
  lots_id? :number,
  batch_material_attribute_id? :number, 
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}


export interface lab_data {
  id? :number,   
  humidity? :number,
  nitrogen_percent? :number,
  ph? :number,
  ashes? :number,
  ammonia_nitrogen? :number,
  protein_nitrogen? :number,
  hydroxide_ph? :number,
  id_bunker_fill? :number,
  id_tunnel_fill? :number,
  id_sowing? :number,
  created_at? :string, 
  modified_at? :string,  
  created_by? :string, 
  modified_by? :string, 
}

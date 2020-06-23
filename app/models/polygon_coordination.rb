class PolygonCoordination
  include Mongoid::Document
  include Mongoid::Geospatial

  field :area, type: Polygon
  
  belongs_to :user
end

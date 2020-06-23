class PolygonCoordinationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @polygon_coordinates = PolygonCoordination.all

    render json: @polygon_coordinates
  end
  
  def create
    binding.pry
    polygon_coordinate = PolygonCoordination.new(area: params[:polygon_coordinate][:area], user: current_user)
    
    if polygon_coordinate.save
      render json: polygon_coordinate, status: :created
    else
      render json: polygon_coordinate.errors, status: :unprocessable_entity
    end
  end
  
  private

  def polygon_coordinates_params
    params.require(:polygon_coordinate).permit(area: [])
  end
end

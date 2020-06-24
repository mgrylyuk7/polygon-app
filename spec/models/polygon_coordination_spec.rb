# frozen_string_literal: true

require 'rails_helper'

describe PolygonCoordination, type: :model do
  context 'be_mongoid_document' do
    it { is_expected.to be_mongoid_document }
  end

  context 'field matchers' do
    it { is_expected.to have_field(:area).of_type(Mongoid::Geospatial::Polygon) }
  end

  context 'associations' do
    it { is_expected.to belong_to(:user) }
  end
end

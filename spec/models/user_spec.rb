# frozen_string_literal: true

require 'rails_helper'

describe User, type: :model do
  context 'be_mongoid_document' do
    it { is_expected.to be_mongoid_document }
  end

  context 'field matchers' do
    it { is_expected.to have_field(:email).of_type(String) }
    it { is_expected.to have_field(:encrypted_password).of_type(String) }
    it { is_expected.to have_field(:reset_password_token).of_type(String) }
    it { is_expected.to have_field(:reset_password_sent_at).of_type(Time) }
    it { is_expected.to have_field(:remember_created_at).of_type(Time) }
  end
  
  context 'associations' do
    it { is_expected.to have_many :polygon_coordinations }
  end
end

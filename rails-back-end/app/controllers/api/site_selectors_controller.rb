class Api::SiteSelectorsController < ApplicationController
  def index
    @site_selector = SiteSelector.where(site_name:params[:site_name])
    render json: @site_selector
  end

  def new
    @site_selector = SiteSelector.new
  end

  def create
    @site_selector = SiteSelector.new(site_selector_params)

    if @site_selector.save
      puts "product saved"
    else
      puts "product not saved"
    end
  end
  
  def site_selector_params
    params.require(:site_selector).permit(
      :site_name,
      :title_tag,
      :price_tag,
      :img_tag,
    )
  end
end

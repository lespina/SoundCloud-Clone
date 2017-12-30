class Api::SessionsController < ApplicationController
  def create
    if logged_in?
      render json: ['You are already logged in'], status: 401
      return
    end

    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render 'api/users/show.json.jbuilder'
    else
      render json: ['Invalid credentials'], status: 401
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: {}
    else
      render json: ['You are not logged in'], status: 404
    end
  end
end

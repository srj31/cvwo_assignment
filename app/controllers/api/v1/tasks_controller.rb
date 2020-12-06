class Api::V1::TasksController < ApplicationController
  def index
    completed = Task.where(completed: true)
    uncompleted = Task.where(completed: false)
    render json: { completed: completed, uncompleted: uncompleted }
  end

  def create
  end

  def show
  end

  def destroy
  end
end

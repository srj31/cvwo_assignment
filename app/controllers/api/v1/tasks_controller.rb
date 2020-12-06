class Api::V1::TasksController < ApplicationController
  def index
    completed = Task.where(completed: true)
    uncompleted = Task.where(completed: false).order(:id)
    render json: { completed: completed, uncompleted: uncompleted }
  end

  def update
    todo = Task.find(params[:id])
    if todo.update_attributes!(todo_params)
      render json: { message: "Todo Item updated successfully" }
    else
      render json: { message: "An error occured" }
    end
  end

  def create
  end

  def show
  end

  def destroy
  end

  private

  def todo_params
    params.require(:task).permit(:id, :name, :description, :completed)
  end
end

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
    new_todo = Task.create!(todo_params)
    if new_todo
      render json: { message: "New Todo Items created"}
    else
      render json: { message: "An error occurred while creating new"}
    end
  end

  def show
  end

  def destroy
    todo&.destroy
    render json: { messgae: "Task Deleted"}
  end

  private

  def todo_params
    params.require(:task).permit(:id, :name, :description, :completed)
  end

  def todo
    @todo ||= Task.find(params[:id])
  end
end

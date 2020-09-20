import time


def timeTest(timeit=False, outputTimeit="Время выполнения функции"):
    def my_timer(f):
        if timeit:
            def tmp(*args, **kwargs):
                start_time = time.time()
                result = f(*args, **kwargs)
                delta_time = time.time() - start_time
                print(f"{outputTimeit} {delta_time}")
                return result
            return tmp
        else:
            return f
    return my_timer

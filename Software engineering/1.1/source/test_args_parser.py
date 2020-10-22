import unittest
import outputPipe
from parseArgs import parseArgs, validateArgs


class ValidateArgsTest(unittest.TestCase):

    def test_no_data_count(self):
        with self.assertRaises(SystemExit):
            parser = parseArgs([])

    def test_incorrect_distribution(self):
        with self.assertRaises(Exception):
            parser = parseArgs(['25', '-d', 'incorectDistribution'])
            validateArgs(parser, parser.timeit, "")

    def test_no_type_of_random_data(self):
        with self.assertRaises(Exception):
            parser = parseArgs(['25', '-d', 'uniform'])
            validateArgs(parser, parser.timeit, "")

    def test_incorrect_type_of_random_data(self):
        with self.assertRaises(Exception):
            parser = parseArgs(['25', '-d', 'uniform', '-t', 'mytype'])
            validateArgs(parser, parser.timeit, "")

    def test_normal_distribution_for_integer(self):
        with self.assertRaises(Exception):
            parser = parseArgs(['25', '-d', 'normal', '-t', 'int'])
            validateArgs(parser, parser.timeit, "")

    def test_no_distribution_params(self):
        with self.assertRaises(Exception):
            parser = parseArgs(['25', '-d', 'uniform', '-t', 'float'])
            validateArgs(parser, parser.timeit, "")

    def test_negative_std(self):
        with self.assertRaises(Exception):
            parser = parseArgs(['25', '-d', 'normal', '-t', 'float', '-mean', '1', '-std', '-1'])
            validateArgs(parser, parser.timeit, "")

    def test_normal_distribution_float(self):  # нет исключения
        parser = parseArgs(['25', '-d', 'normal', '-t', 'float', '-mean', '1', '-std', '3'])
        validateArgs(parser, parser.timeit, "")

    def test_uniform_distribution_float(self):  # нет исключения
        parser = parseArgs(['25', '-d', 'uniform', '-t', 'float', '-min_value', '1', '-max_value', '3'])
        validateArgs(parser, parser.timeit, "")

    def test_uniform_distribution_float(self):  # нет исключения
        parser = parseArgs(['25', '-d', 'uniform', '-t', 'float', '-min_value', '1', '-max_value', '3'])
        validateArgs(parser, parser.timeit, "")
        кф



if __name__ == '__main__':
    unittest.main()
